-- ============================ REQ Garage (Bon Bengkel) ========================================

CREATE TABLE IF NOT EXISTS req_garage (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    dg_date DATE NOT NULL DEFAULT now(),
    dg_note TEXT,
    dg_status VARCHAR(100) NOT NULL,
    dg_created_by VARCHAR(150) NOT NULL,
    dg_updated_by VARCHAR(150),
    dg_deleted_by VARCHAR(150),
    dg_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    dg_updated_at TIMESTAMP WITH TIME ZONE,
    dg_is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- =================================== WORK ORDER (DO) ========================================

CREATE TABLE IF NOT EXISTS  work_order (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    car_id uuid NOT NULL, -- Relasi ke tabel m_car
    cus_id uuid NOT NULL, -- Relasi ke tabel m_customer
    car_license_number VARCHAR(50) NOT NULL, -- Nomor polisi kendaraan
    car_brand VARCHAR(100) NOT NULL, -- Merek mobil
    car_model VARCHAR(100) NOT NULL, -- Model mobil
    wo_name VARCHAR(100) NOT NULL, -- Nama pemilik kendaraan
    wo_no_telp VARCHAR(20) NOT NULL, -- Nomor telepon pemilik
    wo_complaint TEXT NOT NULL, -- Keluhan pelanggan
    wo_mileage_in INT NOT NULL, -- Kilometer masuk kendaraan
    wo_car_year VARCHAR(100) NOT NULL, -- Tahun kendaraan
    wo_date DATE NOT NULL DEFAULT now(), -- Tanggal work order dibuat
    wo_finish_date DATE, -- Tanggal selesai work order
    wo_type VARCHAR(100) NOT NULL, -- Tipe work order
    wo_status VARCHAR(100) NOT NULL, -- Status work order
    wo_created_by VARCHAR(150) NOT NULL, -- Dibuat oleh
    wo_updated_by VARCHAR(150), -- Diperbarui oleh
    wo_deleted_by VARCHAR(150), -- Dihapus oleh
    wo_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), -- Waktu pembuatan
    wo_updated_at TIMESTAMP WITH TIME ZONE, -- Waktu diperbarui
    wo_is_deleted BOOLEAN NOT NULL DEFAULT FALSE -- Status hapus
);

-- Tambah foreign key constraints
ALTER TABLE work_order
    ADD CONSTRAINT work_order_car_id_fkey FOREIGN KEY (car_id) REFERENCES m_car (id);

ALTER TABLE work_order 
    ADD CONSTRAINT work_order_cus_id_fkey FOREIGN KEY (cus_id) REFERENCES m_customer (id);

-- Tambah komentar untuk setiap kolom
COMMENT ON COLUMN work_order.id IS 'ID unik untuk work order';
COMMENT ON COLUMN work_order.car_id IS 'ID referensi ke tabel m_car';
COMMENT ON COLUMN work_order.cus_id IS 'ID referensi ke tabel m_customer';
COMMENT ON COLUMN work_order.car_license_number IS 'Nomor polisi kendaraan';
COMMENT ON COLUMN work_order.car_brand IS 'Merek mobil';
COMMENT ON COLUMN work_order.car_model IS 'Model mobil';
COMMENT ON COLUMN work_order.wo_name IS 'Nama pemilik kendaraan';
COMMENT ON COLUMN work_order.wo_no_telp IS 'Nomor telepon pemilik';
COMMENT ON COLUMN work_order.wo_complaint IS 'Keluhan pelanggan';
COMMENT ON COLUMN work_order.wo_mileage_in IS 'Kilometer masuk kendaraan';
COMMENT ON COLUMN work_order.wo_car_year IS 'Tahun kendaraan';
COMMENT ON COLUMN work_order.wo_date IS 'Tanggal work order dibuat';
COMMENT ON COLUMN work_order.wo_finish_date IS 'Tanggal selesai work order';
COMMENT ON COLUMN work_order.wo_type IS 'Tipe work order';
COMMENT ON COLUMN work_order.wo_status IS 'Status work order';




-- =================================== JOURNAL ======================================== 

CREATE TABLE IF NOT EXISTS journal(  
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    ju_name VARCHAR(255),
    org_id uuid NOT NULL,
    ju_note TEXT,
    ju_date DATE NOT NULL DEFAULT now(),
    ju_type VARCHAR(50) NOT NULL,
    car_license_number VARCHAR(50), -- nomor polisi
    car_brand VARCHAR(50), -- brand mobil
    car_model VARCHAR(50), -- model mobil
    cb_id uuid, -- relation to m_car_brand (id)
    cm_id uuid, -- relation to m_car_model (id),
    ju_cash_amount DECIMAL(12,2) NOT NULL DEFAULT 0, -- uang tunai,
    ju_change_amount DECIMAL(12,2) NOT NULL DEFAULT 0, -- uang kembalian,
    mcus_id not null uuid, -- relation to m_customer
    mcus_name VARCHAR(255), -- nama pelanggan
    mcus_phone VARCHAR(255), -- nomor telepon pelanggan
    mcus_address VARCHAR(255), -- alamat pelanggan
    created_by VARCHAR(150) NOT NULL,
    updated_by VARCHAR(150),
    deleted_by VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
-- Add comments for each column
COMMENT ON COLUMN journal.id IS 'ID unik untuk jurnal';
COMMENT ON COLUMN journal.ju_name IS 'Nama jurnal';
COMMENT ON COLUMN journal.org_id IS 'ID organisasi';
COMMENT ON COLUMN journal.ju_note IS 'Catatan jurnal';
COMMENT ON COLUMN journal.ju_date IS 'Tanggal jurnal';
COMMENT ON COLUMN journal.ju_type IS 'Tipe jurnal';
COMMENT ON COLUMN journal.license_number IS 'Nomor polisi kendaraan';
COMMENT ON COLUMN journal.car_brand IS 'Merek mobil';
COMMENT ON COLUMN journal.car_model IS 'Model mobil';
COMMENT ON COLUMN journal.cb_id IS 'ID referensi ke tabel m_car_brand';
COMMENT ON COLUMN journal.cm_id IS 'ID referensi ke tabel m_car_model';
COMMENT ON COLUMN journal.ju_cash_amount IS 'Jumlah pembayaran tunai';
COMMENT ON COLUMN journal.ju_change_amount IS 'Jumlah uang kembalian';
COMMENT ON COLUMN journal.mcus_id IS 'ID referensi ke tabel m_customer';
COMMENT ON COLUMN journal.mcus_name IS 'Nama pelanggan';
COMMENT ON COLUMN journal.mcus_phone IS 'Nomor telepon pelanggan';
COMMENT ON COLUMN journal.mcus_address IS 'Alamat pelanggan';
);

create table if not exists journal_reference (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    ju_id uuid NOT NULL,
    juref_table_name VARCHAR(255), -- key dari table mana
    juref_value VARCHAR(255), -- value dari table
    created_by VARCHAR(150) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
);

COMMENT ON COLUMN journal_reference.ju_id IS 'Journal ID (id jurnal)';
COMMENT ON COLUMN journal_reference.juref_table_name IS 'Nama tabel referensi';
COMMENT ON COLUMN journal_reference.juref_value IS 'Nilai referensi dari tabel';


-- =================================== JOURNAL DETAIL ========================================
CREATE TABLE IF NOT EXISTS journal_detail (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    j_id uuid NOT NULL,  -- journal id
    jd_name VARCHAR(255),  -- nama detail jurnal
    jd_note TEXT,  -- catatan detail jurnal
    jd_amount DECIMAL(15,2) NOT NULL DEFAULT 0,  -- nominal
    created_by VARCHAR(150) NOT NULL,
    updated_by VARCHAR(150),
    deleted_by VARCHAR(150), 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT journal_detail_j_id_fkey FOREIGN KEY (j_id) REFERENCES journal (id)
);

COMMENT ON COLUMN journal_detail.j_id IS 'Journal ID (id jurnal)';
COMMENT ON COLUMN journal_detail.jd_name IS 'Nama detail jurnal';
COMMENT ON COLUMN journal_detail.jd_note IS 'Catatan detail jurnal';
COMMENT ON COLUMN journal_detail.jd_amount IS 'Nominal';
COMMENT ON CONSTRAINT journal_detail_j_id_fkey ON journal_detail IS 'Foreign key reference to journal(id)';




-- =================================== HISTORY ========================================

CREATE TABLE IF NOT EXISTS h_attendance (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    e_id uuid NOT NULL,  -- employee id (id Pegawai)
    ad_type VARCHAR(50) NOT NULL,  -- IN, OUT, LEAVE, ABSENCE, LEAVE
    ad_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ad_note TEXT,  -- catatan
    created_by VARCHAR(150) NOT NULL, 
    updated_by VARCHAR(150),
    deleted_by VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE, 
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT h_attendance_e_id_fkey FOREIGN KEY (e_id) REFERENCES m_employees (id)
);

COMMENT ON COLUMN h_attendance.e_id IS 'Employee ID (id Pegawai)';
COMMENT ON COLUMN h_attendance.ad_type IS 'IN, OUT, LEAVE, ABSENCE, LEAVE';
COMMENT ON COLUMN h_attendance.ad_note IS 'Catatan';
COMMENT ON CONSTRAINT h_attendance_e_id_fkey ON h_attendance IS 'Foreign key reference to m_employees(id)';


-- ============================== MASTER =================================================

-- ============= TABLE PEGAWAI ===============
CREATE TABLE IF NOT EXISTS m_employees (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    e_name VARCHAR(255) NOT NULL,  -- Nama Pegawai
    e_identity_number VARCHAR(100),  -- Nomor Identitas KTP
    e_address VARCHAR(255),  -- Alamat
    e_address_identity VARCHAR(255),  -- Alamat Domisili sesuai KTP
    e_note TEXT,  -- Catatan
    e_is_active BOOLEAN NOT NULL DEFAULT true,
    e_job_title VARCHAR(100) CHECK (e_job_title IN ('ADMIN', 'MECHANIC', 'CUSTOMER', 'GENERAL')),  -- Jabatan
    e_mechanic_service_fee DECIMAL(3,2),  -- Mekanik Jasa Bengkel Bayaran dalam persen
    e_mechanic_oil_change_service_fee DECIMAL(3,2),  -- Mekanik Jasa Perubahan Oli Bayaran dalam persen
    created_by VARCHAR(150) NOT NULL, 
    updated_by VARCHAR(150),
    deleted_by VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE, 
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);
COMMENT ON COLUMN m_employees.e_name IS 'Nama Pegawai';
COMMENT ON COLUMN m_employees.e_identity_number IS 'Nomor Identitas KTP';
COMMENT ON COLUMN m_employees.e_address IS 'Alamat';
COMMENT ON COLUMN m_employees.e_address_identity IS 'Alamat Domisili sesuai KTP';
COMMENT ON COLUMN m_employees.e_note IS 'Catatan';
COMMENT ON COLUMN m_employees.e_job_title IS 'Jabatan';
COMMENT ON COLUMN m_employees.e_mechanic_service_fee IS 'Mekanik Jasa Bengkel Bayaran dalam persen';
COMMENT ON COLUMN m_employees.e_mechanic_oil_change_service_fee IS 'Mekanik Jasa Perubahan Oli Bayaran dalam persen';




-- ==== TABLE NILAI JASA (SERVICE VALUE) ======

-- Create table without constraints and comments
CREATE TABLE IF NOT EXISTS m_service_value (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    c_id uuid NOT NULL,
    bc_id uuid NOT NULL,
    ps_id uuid NOT NULL,
    sv_price DECIMAL(12, 2),
    sv_commission DECIMAL(12, 2),
    created_by VARCHAR(150) NOT NULL,
    updated_by VARCHAR(150),
    deleted_by VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Add constraints using ALTER TABLE
ALTER TABLE m_service_value
    ADD CONSTRAINT service_value_c_id_fkey FOREIGN KEY (c_id) REFERENCES m_car (id);
ALTER TABLE m_service_value
    ADD CONSTRAINT service_value_bc_id_fkey FOREIGN KEY (bc_id) REFERENCES m_car_model (id);
ALTER TABLE m_service_value
    ADD CONSTRAINT service_value_ps_id_fkey FOREIGN KEY (ps_id) REFERENCES m_product_service (id);
-- Add comments using COMMENT ON COLUMN
COMMENT ON COLUMN m_service_value.c_id IS 'Car Id';
COMMENT ON COLUMN m_service_value.bc_id IS 'Brand Car Id (Model Mobil)';
COMMENT ON COLUMN m_service_value.ps_id IS 'Produk Jasa Id (Product Service)';
COMMENT ON COLUMN m_service_value.sv_price IS 'Harga Jasa Pekerjaan';
COMMENT ON COLUMN m_service_value.sv_commission IS 'Komisi Jasa Untuk Mekanik';



-- ====== TABLE ITEM KALAU DI RAMA LAMA ========

CREATE TABLE IF NOT EXISTS m_products (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    p_name VARCHAR(255),
    p_code VARCHAR(100) UNIQUE,
    p_desc TEXT,
    p_barcode VARCHAR(100),
    p_popular_name VARCHAR(255),
    p_type VARCHAR(100),
    p_part_number VARCHAR(100),
    p_img_url VARCHAR(255),
    p_stock INT, -- ini lebih di pakai pada total stock karena stock nya bisa di ambil di product prices
    p_use VARCHAR(255), -- product ini di pakai di mana ex : mobil L300 
    pg_id uuid, -- relation to product group atau kelompok barang
    pp_id uuid, -- relation to product prices
    created_by VARCHAR(255) NOT NULL, 
    updated_by VARCHAR(255),
    deleted_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE, 
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Add constraints
ALTER TABLE m_products
    ADD CONSTRAINT product_pp_id_fkey FOREIGN KEY (pp_id) REFERENCES m_product_prices (id);

-- Add comments on columns except for timestamps and other unneeded fields
COMMENT ON COLUMN m_products.p_name IS 'Nama Produk';
COMMENT ON COLUMN m_products.p_code IS 'Kode Produk (Unique)';
COMMENT ON COLUMN m_products.p_desc IS 'Deskripsi Produk';
COMMENT ON COLUMN m_products.p_barcode IS 'Kode Barcode Produk';
COMMENT ON COLUMN m_products.p_popular_name IS 'Nama Umum Produk';
COMMENT ON COLUMN m_products.p_type IS 'Tipe Produk';
COMMENT ON COLUMN m_products.p_part_number IS 'Nomor Part Produk';
COMMENT ON COLUMN m_products.p_img_url IS 'URL Gambar Produk';
COMMENT ON COLUMN m_products.p_stock IS 'Jumlah Stok Produk (Dapat Diambil dari product prices)';
COMMENT ON COLUMN m_products.p_use IS 'Produk Digunakan pada (misalnya mobil L300)';
COMMENT ON COLUMN m_products.pg_id IS 'ID Kelompok Barang';
COMMENT ON COLUMN m_products.pp_id IS 'ID Harga Produk';
COMMENT ON COLUMN m_products.is_deleted IS 'Status Hapus Soft Delete';

CREATE INDEX IF NOT EXISTS idx_p_barcode ON public.m_products USING BTREE (p_barcode);
CREATE INDEX IF NOT EXISTS idx_p_code ON public.m_products USING BTREE (p_code);




-- TABLE untuk jasa (SERVICE)
create table if not EXISTS m_product_service (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    ps_code varchar(100) not null UNIQUE,
    ps_desc text,
    ps_barcode VARCHAR(100),
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255),
    deleted_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE, 
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_ps_barcode ON public.m_product_service USING BTREE (ps_barcode);


-- Create the product prices table
CREATE TABLE IF NOT EXISTS m_product_prices (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    p_id uuid NOT NULL,
    pp_sell_price DECIMAL(12, 2),
    pp_base_price DECIMAL(12, 2),
    pp_stock INT,
    pp_is_active BOOLEAN,
    created_by VARCHAR(255) NOT NULL, 
    updated_by VARCHAR(255),
    deleted_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE, 
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Add constraints
ALTER TABLE m_product_prices
    ADD CONSTRAINT product_prices_p_id_fkey FOREIGN KEY (p_id) REFERENCES m_products (id);

-- Add comments on columns
COMMENT ON COLUMN m_product_prices.p_id IS 'ID Produk yang terkait dengan harga';
COMMENT ON COLUMN m_product_prices.pp_sell_price IS 'Harga Jual Produk';
COMMENT ON COLUMN m_product_prices.pp_base_price IS 'Harga Dasar Produk';
COMMENT ON COLUMN m_product_prices.pp_stock IS 'Jumlah Stok Produk pada Harga Tertentu';
COMMENT ON COLUMN m_product_prices.pp_is_active IS 'Status Aktif atau Tidaknya Harga Produk';
COMMENT ON COLUMN m_product_prices.is_deleted IS 'Status Soft Delete untuk Harga Produk';




-- ===== BARANG MELEKAT(attached_items) ======
-- Create the attached items table
CREATE TABLE IF NOT EXISTS m_attached_items (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    ati_name VARCHAR(255),
    ati_is_default BOOLEAN NOT NULL DEFAULT false,
    ati_is_active BOOLEAN NOT NULL DEFAULT true,
    created_by VARCHAR(255) NOT NULL, 
    updated_by VARCHAR(255),
    deleted_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE, 
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Add comments on columns
COMMENT ON COLUMN m_attached_items.ati_name IS 'Nama Barang Terlampir';
COMMENT ON COLUMN m_attached_items.ati_is_default IS 'Menandakan apakah ini barang default';
COMMENT ON COLUMN m_attached_items.ati_is_active IS 'Status aktif atau tidaknya barang terlampir';
COMMENT ON COLUMN m_attached_items.is_deleted IS 'Status Soft Delete untuk Barang Terlampir';


-- =========== MASTER INSENTIF UNTUK MEKANIK ==========
-- Create the mechanic incentive table
CREATE TABLE IF NOT EXISTS m_insentif_mechanic (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    ins_code VARCHAR(100) NOT NULL,  -- Kode Insentif
    ins_type VARCHAR(20) NOT NULL CHECK (ins_type IN ('PERSEN', 'RUPIAH')),  -- Jenis Insentif (PERSEN atau RUPIAH)
    ins_value INT NOT NULL,  -- Nilai Insentif
    created_by VARCHAR(255) NOT NULL,  -- Dibuat oleh
    updated_by VARCHAR(255),  -- Diperbarui oleh
    deleted_by VARCHAR(255),  -- Dihapus oleh (Soft delete)
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),  -- Waktu dibuat
    updated_at TIMESTAMP WITH TIME ZONE,  -- Waktu diperbarui
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE  -- Status Soft Delete
);

-- Add comments on columns
COMMENT ON COLUMN m_insentif_mechanic.ins_code IS 'Kode Insentif Mekanik';
COMMENT ON COLUMN m_insentif_mechanic.ins_type IS 'Jenis Insentif (PERSEN atau RUPIAH)';
COMMENT ON COLUMN m_insentif_mechanic.ins_value IS 'Nilai Insentif yang diberikan';
COMMENT ON COLUMN m_insentif_mechanic.is_deleted IS 'Status Soft Delete untuk Insentif Mekanik';


-- Create the car condition table
CREATE TABLE IF NOT EXISTS m_car_condition (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),  -- ID unik untuk kondisi mobil
    cc_condition VARCHAR(255) NOT NULL,  -- Deskripsi kondisi mobil (misal: Baru, Bekas)
    cc_is_default BOOLEAN NOT NULL DEFAULT false,  -- Menandakan apakah kondisi ini adalah default
    cc_is_active BOOLEAN NOT NULL DEFAULT true,  -- Status apakah kondisi ini aktif
    created_by VARCHAR(255) NOT NULL,  -- Dibuat oleh
    updated_by VARCHAR(255),  -- Diperbarui oleh
    deleted_by VARCHAR(255),  -- Dihapus oleh (Soft delete)
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),  -- Waktu dibuat
    updated_at TIMESTAMP WITH TIME ZONE,  -- Waktu diperbarui
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE  -- Status Soft Delete
);

-- Add comments on columns
COMMENT ON COLUMN m_car_condition.cc_condition IS 'Deskripsi kondisi mobil (misal: Baru, Bekas)';
COMMENT ON COLUMN m_car_condition.cc_is_default IS 'Menandakan apakah kondisi ini adalah kondisi defaultu dap';
COMMENT ON COLUMN m_car_condition.cc_is_active IS 'Status apakah kondisi ini aktif atau tidak';
COMMENT ON COLUMN m_car_condition.is_deleted IS 'Status Soft Delete untuk kondisi mobil';


-- Table Brand (Model) Mobil Misal Honda, Suzuki, dll
CREATE TABLE IF NOT EXISTS m_car_brand (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),  -- ID unik untuk brand mobil
  cb_name VARCHAR(255) NOT NULL,  -- Nama brand mobil (misal: HONDA)
  cb_is_active BOOLEAN NOT NULL DEFAULT true,  -- Status apakah brand ini aktif
  created_by VARCHAR(150) NOT NULL,  -- Dibuat oleh
  updated_by VARCHAR(150),  -- Diperbarui oleh
  deleted_by VARCHAR(150),  -- Dihapus oleh (Soft delete)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),  -- Waktu dibuat
  updated_at TIMESTAMP WITH TIME ZONE,  -- Waktu diperbarui
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE  -- Status Soft Delete untuk brand mobil
);

-- Add comments on columns
COMMENT ON COLUMN m_car_brand.cb_name IS 'Nama brand mobil (misal: HONDA)';
COMMENT ON COLUMN m_car_brand.cb_is_active IS 'Status apakah brand ini aktif atau tidak';
COMMENT ON COLUMN m_car_brand.is_deleted IS 'Status Soft Delete untuk brand mobil';


-- Table Mobil (Merek) Misal Honda Jazz, Suzuki Swift, L300, dll
CREATE TABLE IF NOT EXISTS m_car_model (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  cm_brand_id uuid NOT NULL,
  cm_name VARCHAR(255) NOT NULL, -- ex: JAZZ
  cm_is_active BOOLEAN NOT NULL DEFAULT true,
  created_by VARCHAR(255) NOT NULL, 
  updated_by VARCHAR(255),
  deleted_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE, 
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);
ALTER TABLE m_car_model
  ADD CONSTRAINT car_model_cm_brand_id_fkey FOREIGN KEY (cm_brand_id) REFERENCES m_car_brand (id)


create table if NOT EXISTS m_car (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    cm_id uuid not null,
    cc_id uuid not null,
    ccus_id uuid,
    car_name VARCHAR(255) not null,
    car_license_number VARCHAR(50),
    car_machine_number VARCHAR(50),
    car_year VARCHAR(50),
    car_note VARCHAR (255),
    car_is_active BOOLEAN not null DEFAULT true,
    created_by VARCHAR(255) NOT NULL, 
    updated_by VARCHAR(255),
    deleted_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE, 
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);
    ALTER TABLE m_car
    ADD CONSTRAINT car_cm_id_fkey FOREIGN KEY (cm_id) REFERENCES m_car_model (id),
    ADD CONSTRAINT car_cc_id_fkey FOREIGN KEY (cc_id) REFERENCES m_car_condition (id),
    ADD CONSTRAINT car_customer_ccus_id_fkey FOREIGN KEY (ccus_id) REFERENCES m_customer (id)

-- ========= TABLE REALTION CAR - CUSTOMER =========

-- Create the customer car table
CREATE TABLE IF NOT EXISTS m_customer_car (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    c_id uuid NOT NULL,  -- ID mobil (referensi ke m_car)
    cus_id uuid NOT NULL,  -- ID customer (referensi ke m_customer)
    created_by VARCHAR(255) NOT NULL,  -- Dibuat oleh
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()  -- Waktu pembuatan
);

-- Add foreign key constraints
ALTER TABLE m_customer_car
    ADD CONSTRAINT customer_car_c_id_fkey FOREIGN KEY (c_id) REFERENCES m_car (id);

ALTER TABLE m_customer_car
    ADD CONSTRAINT customer_car_cus_id_fkey FOREIGN KEY (cus_id) REFERENCES m_customer (id);


-- Buat Table Customer (Pelanggan)
CREATE TABLE IF NOT EXISTS m_customer (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    c_name VARCHAR(255) NOT NULL,  -- Nama Customer
    c_phone VARCHAR(50),  -- Nomor Telepon Customer
    c_address VARCHAR(255),  -- Alamat Customer
    c_desc text,  -- Deskripsi Customer
    c_is_active BOOLEAN NOT NULL DEFAULT true,  -- Status aktif atau tidak
    created_by VARCHAR(150) NOT NULL,  -- Dibuat oleh
    updated_by VARCHAR(150),  -- Diupdate oleh
    deleted_by VARCHAR(150),  -- Dihapus oleh
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),  -- Waktu pembuatan
    updated_at TIMESTAMP WITH TIME ZONE,  -- Waktu pembaruan
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE  -- Status penghapusan
);

-- Add comments for each column
COMMENT ON COLUMN m_customer.id IS 'ID unik untuk customer';
COMMENT ON COLUMN m_customer.c_name IS 'Nama Customer';
COMMENT ON COLUMN m_customer.c_phone IS 'Nomor Telepon Customer';
COMMENT ON COLUMN m_customer.c_address IS 'Alamat Customer';
COMMENT ON COLUMN m_customer.c_desc IS 'Deskripsi Customer';



CREATE TABLE IF NOT EXISTS m_unit (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),  -- ID unik untuk unit
    u_code VARCHAR(100) NOT NULL,  -- Kode unit
    u_name VARCHAR(255) NOT NULL,  -- Nama unit
    u_desc text,  -- Deskripsi unit
    u_is_active BOOLEAN NOT NULL DEFAULT true,  -- Status aktif atau tidak
    created_by VARCHAR(150) NOT NULL,  -- Dibuat oleh
    updated_by VARCHAR(150),  -- Diupdate oleh
    deleted_by VARCHAR(150),  -- Dihapus oleh
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),  -- Waktu pembuatan
    updated_at TIMESTAMP WITH TIME ZONE,  -- Waktu pembaruan
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE  -- Status penghapusan
);

-- Add comments for each column
COMMENT ON COLUMN m_unit.id IS 'ID unik untuk unit';
COMMENT ON COLUMN m_unit.u_code IS 'Kode unit';
COMMENT ON COLUMN m_unit.u_name IS 'Nama unit';
COMMENT ON COLUMN m_unit.u_desc IS 'Deskripsi unit';


-- Create the supplier table
CREATE TABLE IF NOT EXISTS m_supplier (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),  -- ID unik untuk supplier
    s_code VARCHAR(100) NOT NULL UNIQUE,  -- Kode supplier, unik untuk setiap supplier
    s_name VARCHAR(255) NOT NULL,  -- Nama supplier
    s_address VARCHAR(255),  -- Alamat supplier
    s_contact_person VARCHAR(255),  -- Kontak person supplier
    s_desc text,  -- Deskripsi supplier
    s_email VARCHAR(255),  -- Email supplier
    s_city VARCHAR(255),  -- Kota supplier
    s_phone_number VARCHAR(50),  -- Nomor telepon supplier
    s_payment_method VARCHAR(50),  -- Metode pembayaran yang digunakan
    s_cc_payment_term int,  -- Jangka waktu pembayaran dalam hari
    created_by VARCHAR(150) NOT NULL,  -- Dibuat oleh
    updated_by VARCHAR(150),  -- Diupdate oleh
    deleted_by VARCHAR(150),  -- Dihapus oleh
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),  -- Waktu pembuatan
    updated_at TIMESTAMP WITH TIME ZONE,  -- Waktu pembaruan
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE  -- Status penghapusan
);

-- Add comments for each column
COMMENT ON COLUMN m_supplier.id IS 'ID unik untuk supplier';
COMMENT ON COLUMN m_supplier.s_code IS 'Kode supplier, unik untuk setiap supplier';
COMMENT ON COLUMN m_supplier.s_name IS 'Nama supplier';
COMMENT ON COLUMN m_supplier.s_address IS 'Alamat supplier';
COMMENT ON COLUMN m_supplier.s_contact_person IS 'Kontak person supplier';
COMMENT ON COLUMN m_supplier.s_desc IS 'Deskripsi supplier';
COMMENT ON COLUMN m_supplier.s_email IS 'Email supplier';
COMMENT ON COLUMN m_supplier.s_city IS 'Kota supplier';
COMMENT ON COLUMN m_supplier.s_phone_number IS 'Nomor telepon supplier';
COMMENT ON COLUMN m_supplier.s_payment_method IS 'Metode pembayaran yang digunakan';
COMMENT ON COLUMN m_supplier.s_cc_payment_term IS 'Jangka waktu pembayaran dalam hari';



-- ======== USER =======

CREATE TABLE IF NOT EXISTS sec_users (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),  -- ID unik untuk user
    org_id uuid NOT NULL,  -- ID organisasi, relasi ke tabel sec_organization
    u_name VARCHAR(255) NOT NULL,  -- Nama pengguna
    u_password VARCHAR(255) NOT NULL,  -- Kata sandi pengguna
    u_email VARCHAR(255),  -- Email pengguna
    u_is_banned BOOLEAN NOT NULL DEFAULT false,  -- Status banned pengguna
    u_is_active BOOLEAN NOT NULL DEFAULT true,  -- Status aktif pengguna
    created_by VARCHAR(255) NOT NULL,  -- Dibuat oleh
    updated_by VARCHAR(255),  -- Diupdate oleh
    deleted_by VARCHAR(255),  -- Dihapus oleh
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),  -- Waktu pembuatan
    updated_at TIMESTAMP WITH TIME ZONE,  -- Waktu pembaruan
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE  -- Status penghapusan
);

-- Add comments for each column
COMMENT ON COLUMN sec_users.id IS 'ID unik untuk user';
COMMENT ON COLUMN sec_users.org_id IS 'ID organisasi, relasi ke tabel sec_organization';
COMMENT ON COLUMN sec_users.u_name IS 'Nama pengguna';
COMMENT ON COLUMN sec_users.u_password IS 'Kata sandi pengguna';
COMMENT ON COLUMN sec_users.u_email IS 'Email pengguna';

-- Add the FOREIGN KEY constraint
ALTER TABLE sec_users 
    ADD CONSTRAINT secusers_org_id_fkey FOREIGN KEY (org_id) REFERENCES sec_organization (id);



-- Create the sec_organization table
CREATE TABLE IF NOT EXISTS sec_organization (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),  -- ID unik untuk organisasi
    o_name VARCHAR(255) NOT NULL,  -- Nama Organisasi
    o_desc text,  -- Deskripsi Organisasi
    o_is_ext BOOLEAN,  -- Apakah organisasi ini sistem lain
    o_is_active BOOLEAN NOT NULL DEFAULT true,  -- Status aktif organisasi
    created_by VARCHAR(255) NOT NULL,  -- Dibuat oleh
    updated_by VARCHAR(255),  -- Diupdate oleh
    deleted_by VARCHAR(255),  -- Dihapus oleh
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),  -- Waktu pembuatan
    updated_at TIMESTAMP WITH TIME ZONE,  -- Waktu pembaruan
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE  -- Status penghapusan
);

-- Add comments for each column
COMMENT ON COLUMN sec_organization.o_name IS 'Nama Organisasi';
COMMENT ON COLUMN sec_organization.o_desc IS 'Deskripsi Organisasi';
COMMENT ON COLUMN sec_organization.o_is_ext IS 'Apakah organisasi ini sistem lain';
COMMENT ON COLUMN sec_organization.o_is_active IS 'Status aktif organisasi';


-- Create the sec_group table
CREATE TABLE IF NOT EXISTS sec_group (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),  -- ID unik untuk grup
    org_id uuid NOT NULL,  -- ID organisasi yang terkait
    g_name VARCHAR(255) NOT NULL,  -- Nama grup
    g_is_active BOOLEAN NOT NULL DEFAULT true,  -- Status aktif grup
    created_by VARCHAR(255) NOT NULL,  -- Dibuat oleh
    updated_by VARCHAR(255),  -- Diupdate oleh
    deleted_by VARCHAR(255),  -- Dihapus oleh
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),  -- Waktu pembuatan
    updated_at TIMESTAMP WITH TIME ZONE,  -- Waktu pembaruan
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE  -- Status penghapusan
);

-- Add comments for each column
COMMENT ON COLUMN sec_group.org_id IS 'ID organisasi yang terkait';
COMMENT ON COLUMN sec_group.g_name IS 'Nama grup';
COMMENT ON COLUMN sec_group.g_is_active IS 'Status aktif grup';

-- Add foreign key constraint
ALTER TABLE sec_group
    ADD CONSTRAINT secgroup_org_id_fkey FOREIGN KEY (org_id) REFERENCES sec_organization (id);



