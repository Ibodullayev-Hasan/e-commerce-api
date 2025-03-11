import { UserRole } from "src/enums";
import { IUser } from "src/interfaces";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User implements IUser {

	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column({ type: "text" })
	full_name: string;

	@Column({ type: "text", unique: true })
	email: string;

	@Column({ type: "text" })
	password: string;

	@Column({ type: "varchar", default: UserRole.USER })
	role?: string;
}
