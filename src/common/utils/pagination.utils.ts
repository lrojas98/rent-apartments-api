import { IPagination } from '../interfaces';

export const parsePagination = ({
  page = 1,
  limit = 8,
}: IPagination): IPagination => {
  const pagination: IPagination = {
    page: Math.round(page),
    limit: Math.round(limit),
    offset: Math.round((page - 1) * limit),
  };

  return pagination;
};