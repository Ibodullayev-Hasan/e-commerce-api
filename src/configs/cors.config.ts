import { INestApplication } from "@nestjs/common";

export function corsConfig(app: INestApplication) {
	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true
	});
}