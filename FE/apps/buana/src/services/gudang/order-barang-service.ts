'use client'

import type { z } from 'zod'
import type { listBarangMelekatSchema } from '@/src/lib/validation/master/barang-melekat/list-barang-melekat-schema'
import type { UpsertOrderBarangSchema} from '@/src/lib/validation/gudang/order-barang/upsert-order-barang-schema'
import { upsertOrderBarangSchema } from '@/src/lib/validation/gudang/order-barang/upsert-order-barang-schema'
import type { paginationResponseSchema } from '@/src/lib/validation/pagination/pagination-response-schema'
import type { PaginatedParams } from '@/src/types/pagination-type'
import { calculateNumberOfPages, calculatePagination } from '@/src/utils/pagination/pagination-util'
import { createClient } from '@/src/utils/supabase/client'


const tableName = 'po'
const defaultUser = 'systemPO';
type PaginationResponse = z.infer<ReturnType<typeof paginationResponseSchema<typeof upsertOrderBarangSchema>>>;

export class OrderBarangSevice {
  private static supabase = createClient()

  static async getAll(params?: PaginatedParams): Promise<PaginationResponse> {
    const { from, to, limit, pageIndex, orderBy, sortDir, search } = calculatePagination(params);

    const { data, count: totalCount, error } = await this.supabase
      .from(tableName)
      .select('*', { count: 'exact', })
      .eq('is_deleted', false)
      .ilike('po_number', `%${search}%`)
      .order(orderBy, { ascending: sortDir === 'asc' })
      .range(from, to);

    if (error) throw error;

    const numberOfPages = calculateNumberOfPages(totalCount || 0, limit);

    return {
      data: data || [],
      total: totalCount || 0,
      pageIndex,
      numberOfPages
    };
  }

  static async getById(id: string): Promise<UpsertOrderBarangSchema> {
    const { data, error } = await this.supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }

  static async insert(req: UpsertOrderBarangSchema): Promise<UpsertOrderBarangSchema> {
    const { ...form } = req ;
    const { data: { user } } = await this.supabase.auth.getUser();
    const emailUser = user?.email ?? defaultUser;
    const { data, error } = await this.supabase
      .from(tableName)
      .insert([{
        ...form,
        created_by: emailUser,
        created_at: new Date().toISOString(),
        updated_by : emailUser,
        updated_at : new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async update(orderBarang: UpsertOrderBarangSchema): Promise<UpsertOrderBarangSchema> {
    const form = upsertOrderBarangSchema.parse(orderBarang);
    const { data: { user } } = await this.supabase.auth.getUser();
    const emailUser = user?.email ?? defaultUser;
    console.log('update order barang:', form);
    const { data, error } = await this.supabase
      .from(tableName)
      .update({ 
        ...form, 
        updated_by: emailUser, 
        updated_at: new Date().toISOString(), 
      })
      .eq('id', orderBarang.id)
      .select()
      .single()

    if (error) throw error
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { data: { user } } = await this.supabase.auth.getUser();
    const emailUser = user?.email ?? defaultUser;
    const { error } = await this.supabase
      .from(tableName)
      .update({
        is_deleted: true,
        deleted_by: emailUser,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error
  }
}