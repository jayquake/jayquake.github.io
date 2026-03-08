import type { FlowConfig } from '../../../shared/types';

import { BaseRepository } from './BaseRepository';

/**
 * FlowRepository - Data access for Flow entities
 * Note: Flows are currently stored in memory/config, but this repository
 * provides an interface for future database storage
 */
export class FlowRepository extends BaseRepository<FlowConfig, FlowConfig, Partial<FlowConfig>> {
  // For now, flows are managed in memory
  // This repository is a placeholder for future database storage

  async count(filters?: any): Promise<number> {
    // TODO: Implement when flows are stored in database
    return 0;
  }

  async create(data: FlowConfig): Promise<FlowConfig> {
    // TODO: Implement when flows are stored in database
    throw new Error('Flow creation not yet implemented in database');
  }

  async delete(id: string): Promise<void> {
    // TODO: Implement when flows are stored in database
    throw new Error('Flow delete not yet implemented in database');
  }

  async findAll(filters?: any): Promise<FlowConfig[]> {
    // TODO: Implement when flows are stored in database
    throw new Error('Flow findAll not yet implemented in database');
  }

  async findById(id: string): Promise<FlowConfig | null> {
    // TODO: Implement when flows are stored in database
    throw new Error('Flow findById not yet implemented in database');
  }

  async update(id: string, data: Partial<FlowConfig>): Promise<FlowConfig> {
    // TODO: Implement when flows are stored in database
    throw new Error('Flow update not yet implemented in database');
  }
}
