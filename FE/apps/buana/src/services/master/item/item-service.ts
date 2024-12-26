"use client"
import { itemSchema } from "@/src/lib/validation/master/item/item-schema";
import { upsertItemSchema, UpsertItemSchema } from "@/src/lib/validation/master/item/upsert-item-schema";
import { paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { PaginatedParams } from "@/src/types/pagination-type";
import { calculateNumberOfPages, calculatePagination } from "@/src/utils/pagination/pagination-util";
import { createClient } from "@/src/utils/supabase/client";
import { z } from "zod";

const tableName = 'm_products';
const defaultUser = 'system_product';


type PaginationResponse = z.infer<ReturnType<typeof paginationResponseSchema<typeof itemSchema>>>;


export class ItemService {

    private static supabase = createClient();

    static async getAll(params?: PaginatedParams): Promise<PaginationResponse> {
        const { from, to, limit, pageIndex, orderBy, sortDir, search } = calculatePagination(params);

        const { data, count: totalCount, error } = await this.supabase
            .from(tableName)
            .select('*', { count: 'exact' })
            .eq('is_deleted', false)
            .like('p_name', `%${search}%`)
            .order(orderBy, { ascending: sortDir === 'asc' })
            .range(from, to);

        if (error) throw error;

        const numberOfPages = calculateNumberOfPages(totalCount || 0, limit);   
        return {
            data : data || [],
            total: totalCount || 0,
            pageIndex: pageIndex,
            numberOfPages
        }
    }

    static async getById(id: string): Promise<UpsertItemSchema> {
        const { data, error } = await this.supabase
            .from(tableName)
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;

        return data;
    }

    static async insert(req: UpsertItemSchema): Promise<UpsertItemSchema> {
        const form = upsertItemSchema.parse(req);
        const { data: { user } } = await this.supabase.auth.getUser();
        const emailUser = user?.email ?? defaultUser;

        const { data, error } = await this.supabase
            .from(tableName)
            .insert([{
                ...form,
                created_by: emailUser,
                created_at: new Date().toISOString(),
                updated_by: emailUser,
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    static async update(req: UpsertItemSchema): Promise<UpsertItemSchema> {
        console.log(req);   
        const form = upsertItemSchema.parse(req);
        const { data: { user } } = await this.supabase.auth.getUser();
        const emailUser = user?.email ?? defaultUser;

        const { data, error } = await this.supabase
            .from(tableName)
            .update({
                ...form,    
                updated_by: emailUser,
                updated_at: new Date().toISOString()
            })
            .eq('id', req.id)
            .select()
            .single();

        if (error) throw error;
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

        if (error) throw error;
    }   


}
