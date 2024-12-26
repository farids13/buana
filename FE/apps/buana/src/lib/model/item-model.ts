import { IField } from "../field";

export const itemModel: Record<string, IField> = {
    id: {
        field: 'id',
        type: 'string',
        label: 'ID',
    },
    code: {
        field: 'p_code',
        type: 'string',
        label: 'Kode Produk',
    },
    name: {
        field: 'p_name',
        type: 'string',
        label: 'Nama Produk',
    },
    description: {
        field: 'p_desc',
        type: 'string',
        label: 'Deskripsi',
    },
    barcode: {
        field: 'p_barcode',
        type: 'string',
        label: 'Barcode',
    },
    popularName: {
        field: 'p_popular_name',
        type: 'string',
        label: 'Nama Populer',
    },
    type: {
        field: 'p_type',
        type: 'string',
        label: 'Tipe',
    },
    partNumber: {
        field: 'p_part_number',
        type: 'string',
        label: 'Nomor Part',
    },
    imageUrl: {
        field: 'p_img_url',
        type: 'string',
        label: 'URL Gambar',
    },
    stock: {
        field: 'p_stock',
        type: 'number',
        label: 'Stok',
    },
    use: {
        field: 'p_use',
        type: 'string',
        label: 'Penggunaan',
    },
    groupId: {
        field: 'pg_id',
        type: 'string',
        label: 'ID Grup',
    },
    productId: {
        field: 'pp_id',
        type: 'string',
        label: 'ID Produk',
    },
    basePrice: {
        field: 'p_base_price',
        type: 'number',
        label: 'Harga Dasar',
    },
    sellPrice: {
        field: 'p_sell_price',
        type: 'number',
        label: 'Harga Jual',
    },
    group: {
        field: 'p_group',
        type: 'string',
        label: 'Grup',
    },
    unitId: {
        field: 'p_unit_id',
        type: 'string',
        label: 'ID Unit',
    }
};