import Tasks from '@modules/tasks/infra/typeorm/entities/Task';
import User from '@modules/users/infra/typeorm/entities/User';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('projects')
class Projects {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.projects)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @OneToMany(() => Tasks, tasks => tasks.project_id, { eager: true})
  tasks: Tasks[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Projects;
