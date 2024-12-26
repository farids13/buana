export class ApiError extends Error {
  response?: {
    status?: number;
  };

  constructor(error: { message: string; status?: number }) {
    super(error.message);
    this.response = {
      status: error.status
    };
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const ERROR_MESSAGES = {
  PRODUCT_CODE_EXIST: "Kode product sudah digunakan, silahkan gunakan kode lain",
  UNAUTHORIZED: "Sesi anda telah berakhir, silahkan login kembali",
  FORBIDDEN: "Anda tidak memiliki akses ke halaman ini",
  NOT_FOUND: "Data tidak ditemukan",
  INTERNAL_SERVER_ERROR: "Terjadi kesalahan pada server",
  BAD_REQUEST: "Permintaan tidak valid",
  NETWORK_ERROR: "Koneksi internet terputus",
  DEFAULT: "Terjadi kesalahan, silahkan coba lagi nanti",
  CONFLICT: "Data yang dimasukkan sudah ada"
} as const;

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const err = error as any;
    console.log("Error dari getErrorMessage:", err);

    if (err.code === '23505' || 
        err.message?.includes('duplicate key value') || 
        err.message?.includes('m_products_p_code_unique')) {
      return ERROR_MESSAGES.PRODUCT_CODE_EXIST;
    }

    switch (err.status || err.response?.status) {
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403: 
        return ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 400:
        return ERROR_MESSAGES.BAD_REQUEST;
      case 409:
        return ERROR_MESSAGES.CONFLICT;
      case 500:
        return ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
      default:
        return err.message || ERROR_MESSAGES.DEFAULT;
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('Network Error')) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    return error.message;
  }

  return ERROR_MESSAGES.DEFAULT;
};


export const errorMessages = (error: unknown): string | undefined => {
  if (error instanceof ApiError) {
    return error.message;
  }
};
