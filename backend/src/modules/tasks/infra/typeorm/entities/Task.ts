import Project from '@modules/projects/infra/typeorm/entities/Project';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tasks')
class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  date_start: Date;

  @Column()
  date_end: Date;

  @Column()
  status: string;

  @ManyToOne(() => Project, project => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project_id: Project;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Tasks;
