import { type PrismaClient } from '@prisma/client';

import { DatabaseService } from '../infrastructure/database/DatabaseService';

/**
 * BaseRepository - Generic CRUD operations for all repositories
 * Provides common database operations that can be extended by specific repositories
 */
export abstract class BaseRepository<T, CreateInput, UpdateInput> {
  protected prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || DatabaseService.getInstance().getClient();
  }

  /**
   * Count records with optional filters
   */
  abstract count(filters?: any): Promise<number>;

  /**
   * Create a new record
   */
  abstract create(data: CreateInput): Promise<T>;

  /**
   * Delete a record by ID
   */
  abstract delete(id: string): Promise<void>;

  /**
   * Check if a record exists by ID
   */
  async exists(id: string): Promise<boolean> {
    const record = await this.findById(id);
    return record !== null;
  }

  /**
   * Find all records with optional filters
   */
  abstract findAll(filters?: any): Promise<T[]>;

  /**
   * Find a record by ID
   */
  abstract findById(id: string): Promise<null | T>;

  /**
   * Find records with pagination
   */
  async findManyPaginated(
    page = 1,
    pageSize = 10,
    filters?: any,
  ): Promise<{ data: T[]; page: number; pageSize: number; total: number; totalPages: number }> {
    const skip = (page - 1) * pageSize;
    const data = await this.findAll({ ...filters, skip, take: pageSize });
    const total = await this.count(filters);

    return {
      data,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * Update a record by ID
   */
  abstract update(id: string, data: UpdateInput): Promise<T>;
}
