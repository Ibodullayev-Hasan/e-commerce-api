import { ConfigModuleOptions } from "@nestjs/config";

export const EnvConfig: ConfigModuleOptions = {
	load:[],
	isGlobal:true,
	envFilePath:".env"
}