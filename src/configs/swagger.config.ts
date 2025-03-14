import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setUpswagger(app: INestApplication) {
	const options = new DocumentBuilder()
		.setTitle(`E-Commerce API`)
		.setDescription(`E-Commerce loyihasi uchun API dokumenti`)
		.setVersion('1.0')
		.addTag(`E-Commerce`)
		.addBearerAuth()
		.build()

	const dokument = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api/docs', app, dokument)
}