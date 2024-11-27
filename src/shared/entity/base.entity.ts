import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm'

export abstract class EntityBase {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean

  @DeleteDateColumn({ type: 'timestamp', nullable: true, name: 'deleted_at' })
  deletedAt: Date

  @Column({ type: 'int', nullable: true, name: 'created_by' })
  createdBy: number

  @Column({ type: 'int', nullable: true, name: 'updated_by' })
  updatedBy: number
}
