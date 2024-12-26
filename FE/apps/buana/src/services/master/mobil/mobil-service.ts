'use client'

import type { z } from 'zod'
import { upsertBarangMelekatSchemaForm } from '@/src/lib/validation/master/barang-melekat/upsert-barang-melekat-schema'
import type { paginationResponseSchema } from '@/src/lib/validation/pagination/pagination-response-schema'
import type { PaginatedParams } from '@/src/types/pagination-type'
import { calculateNumberOfPages, calculatePagination } from '@/src/utils/pagination/pagination-util'
import { createClient } from '@/src/utils/supabase/client'
import { UpsertDetailMobilSchema, upsertMobilSchemaForm, type UpsertMobilSchema } from '@/src/lib/validation/master/mobil/upsert-mobil-schema'
import { mobilSchema } from '@/src/lib/validation/master/mobil/mobil-schema'


const tableName = 'm_car'
const tableNameRelation = 'customer_car'
const defaultUser = 'system_car';

type PaginationResponse = z.infer<ReturnType<typeof paginationResponseSchema<typeof mobilSchema>>>;
export class MobilService {
  private static supabase = createClient()

  static async getAllActive (): Promise<UpsertMobilSchema[]> {
    const { data, error } = await this.supabase
      .from(tableName)
      .select('*')
      .eq('is_deleted', false)
      .eq('car_is_active', true);
    if (error) throw error;

    return data || [];
  }


  // ------------- CRUD -------------

  static async getAll(params?: PaginatedParams): Promise<PaginationResponse> {
    const { from, to, limit, pageIndex, orderBy, sortDir, search } = calculatePagination(params);

    const { data, count: totalCount, error } = await this.supabase
      .from(tableName)
      .select(`
        *,
        car_brand:m_car_brand(id, cb_name),
        car_model:m_car_model(id, cm_name),
        customer_car!left(
          customer:m_customer(id, cus_name)
        )
      `, { count: 'exact', })
      .eq('is_deleted', false)
      .ilike('car_license_number', `%${search}%`)
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

  static async getById(id: string): Promise<UpsertDetailMobilSchema> {
    const { data, error } = await this.supabase
      .from(tableName)
      .select(`
        *,
        car_brand:m_car_brand(id, cb_name),
        car_model:m_car_model(id, cm_name),
        customer_car!left(
          customer:m_customer(id, cus_name)
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }

  static async insert(req: UpsertMobilSchema): Promise<UpsertMobilSchema> {
    const form = upsertMobilSchemaForm.parse(req);
    const { data: { user } } = await this.supabase.auth.getUser();
    const emailUser = user?.email ?? defaultUser;
    const { data, error } = await this.supabase
      .from(tableName)
      .upsert({
        ...form,
        created_by: emailUser,
        created_at: new Date().toISOString(),
        updated_by : emailUser,
        updated_at : new Date().toISOString()
      })
      .select()
      .single();

      console.log('data:', data);

    if(data != null && data.id != null && req.customers != null && req.customers.length > 0) {
      console.log('insert customers:', req.customers, data.id);
      await this.supabase
        .from(tableNameRelation)
        .insert(req.customers.map(customer => ({car_id: data.id, customer_id: customer})))
    }

    if (error) throw error
    return data
  }

  static async update(req: UpsertMobilSchema): Promise<UpsertMobilSchema> {
    const form = upsertMobilSchemaForm.parse(req);
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

      if(data != null && data.id != null && req.customers != null && req.customers.length > 0) {
        await this.supabase
          .from('customer_car')
          .delete()
          .eq('car_id', req.id);
        await this.supabase
          .from('customer_car')
          .insert(req.customers.map(customer => ({car_id: data.id, customer_id: customer})))
      }

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
