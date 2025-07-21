import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { IPagination } from '../interfaces';
import { parsePagination } from '../utils/pagination.utils';

@Injectable()
export class PaginationPipe implements PipeTransform<Record<string, string | undefined>, IPagination> {
  transform(value: Record<string, string | undefined>): IPagination {
    let page = value.page ? parseInt(value.page, 10) : undefined;
    let limit = value.limit ? parseInt(value.limit, 10) : undefined;

    if (page !== undefined && (isNaN(page) || page < 1)) {
      throw new BadRequestException('El parámetro "page" debe ser un número entero positivo.');
    }
    if (limit !== undefined && (isNaN(limit) || limit < 1)) {
      throw new BadRequestException('El parámetro "limit" debe ser un número entero positivo.');
    }
    const pagination = parsePagination({ page, limit });

    return pagination;
  }
}
