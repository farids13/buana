'use client'

import type { z } from 'zod'
import type { paginationResponseSchema } from '@/src/lib/validation/pagination/pagination-response-schema'
import type { PaginatedParams } from '@/src/types/pagination-type'
import { calculateNumberOfPages, calculatePagination } from '@/src/utils/pagination/pagination-util'
import { createClient } from '@/src/utils/supabase/client'
import { pelangganSchema } from '@/src/lib/validation/master/pelanggan/pelanggan-schema'
import { UpsertPelangganSchema, upsertPelangganSchemaForm } from '@/src/lib/validation/master/pelanggan/upsert-pelanggan-schema'


const tableName = 'm_customer'
const defaultUser = 'system_customer';

type PaginationResponse = z.infer<ReturnType<typeof paginationResponseSchema<typeof pelangganSchema>>>;
export class PelangganService {
  private static supabase = createClient()

  static async getAllActive(): Promise<UpsertPelangganSchema[]> {
    const { data, error } = await this.supabase
      .from(tableName)
      .select('*')
      .eq('is_deleted', false)
      .eq('cus_is_active', true);

    if (error) throw error;

    return data || [];
  }

  // ------------- CRUD -------------

  static async getAll(params?: PaginatedParams): Promise<PaginationResponse> {
    const { from, to, limit, pageIndex, orderBy, sortDir, search } = calculatePagination(params);

    const { data, count: totalCount, error } = await this.supabase
      .from(tableName)
      .select('*', { count: 'exact', })
      .eq('is_deleted', false)
      .ilike('cus_name', `%${search}%`)
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

  static async getById(id: string): Promise<UpsertPelangganSchema> {
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

  static async insert(req: UpsertPelangganSchema): Promise<UpsertPelangganSchema> {
    const form = upsertPelangganSchemaForm.parse(req);
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

  static async update(req: UpsertPelangganSchema): Promise<UpsertPelangganSchema> {
    const form = upsertPelangganSchemaForm.parse(req);
    const { data: { user } } = await this.supabase.auth.getUser();
    const emailUser = user?.email ?? defaultUser;
    console.log('update barang melekat:', form);
    const { data, error } = await this.supabase
      .from(tableName)
      .update({ 
        ...form, 
        updated_by: emailUser, 
        updated_at: new Date().toISOString(), 
      })
      .eq('id', req.id)
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
