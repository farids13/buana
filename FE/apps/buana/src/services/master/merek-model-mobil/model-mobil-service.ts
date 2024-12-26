"use client"
import type { z } from "zod";
import type { PaginatedParams } from "../../../types/pagination-type";
import { calculateNumberOfPages, calculatePagination } from "../../../utils/pagination/pagination-util";
import { createClient } from "../../../utils/supabase/client";
import { ModelMobilSchema, modelMobilSchema } from "../../../lib/validation/master/merek-model-mobil/model-mobil/model-mobil-schema";
import { paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { UpsertModelMobilSchema, upsertModelMobilSchemaForm } from "@/src/lib/validation/master/merek-model-mobil/model-mobil/upsert-model-mobil-schema";

const tableName = 'm_car_model';
const defaultUser = 'system_cm';


type PaginationResponse = z.infer<ReturnType<typeof paginationResponseSchema<typeof modelMobilSchema>>>;


export class ModelMobilService {

    private static supabase = createClient();

    static async getAllActive(merekId: string): Promise<UpsertModelMobilSchema[]> {
        const { data, error } = await this.supabase
            .from(tableName)
            .select('*')
            .eq('is_deleted', false)
            .eq('cm_is_active', true);

        if (error) throw error;
        return data || [];
    }

    static async getAllActiveByMerekId(merekId: string): Promise<UpsertModelMobilSchema[]> {
        const { data, error } = await this.supabase
            .from(tableName)
            .select('*')
            .eq('cm_brand_id', merekId)
            .eq('is_deleted', false)
            .eq('cm_is_active', true);
    
        if (error) throw error;
        return data || [];
    }

    // ------------- CRUD -------------

    static async getAll(params?: PaginatedParams): Promise<PaginationResponse> {
        const { from, to, limit, pageIndex, orderBy, sortDir, search } = calculatePagination(params);

        const { data, count: totalCount, error } = await this.supabase
            .from(tableName)
            .select('*', { count: 'exact' })
            .eq('is_deleted', false)
            .ilike('cm_name', `%${search}%`)
            .order(orderBy, { ascending: sortDir === 'asc' })
            .range(from, to);

        if (error) throw error;

        const numberOfPages = calculateNumberOfPages(totalCount || 0, limit);
        return {
            data: data || [],
            total: totalCount || 0,
            pageIndex,
            numberOfPages
        }
    }

    static async getAllByMerekMobilId(merekMobilId: string, params?: PaginatedParams): Promise<PaginationResponse> {
        const { from, to, limit, pageIndex, orderBy, sortDir, search } = calculatePagination(params);

        const { data, count: totalCount, error } = await this.supabase
            .from(tableName)
            .select('*', { count: 'exact' })
            .eq('is_deleted', false)
            .eq('cm_brand_id', merekMobilId)
            .ilike('cm_name', `%${search}%`)
            .order(orderBy, { ascending: sortDir === 'asc' })
            .range(from, to);

        if (error) throw error;

        const numberOfPages = calculateNumberOfPages(totalCount || 0, limit);
        return {
            data: data || [],
            total: totalCount || 0,
            pageIndex,
            numberOfPages
        }
    }



    static async getById(id: string): Promise<ModelMobilSchema> {
        const { data, error } = await this.supabase
            .from(tableName)
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        return data;
    }

    static async insert(req: UpsertModelMobilSchema): Promise<ModelMobilSchema> {
        const form = upsertModelMobilSchemaForm.parse(req);
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

    static async update(req: UpsertModelMobilSchema): Promise<ModelMobilSchema> {
        console.log(req);
        const form = upsertModelMobilSchemaForm.parse(req);
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
