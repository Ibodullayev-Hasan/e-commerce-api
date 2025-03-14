import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus, BadRequestException } from "@nestjs/common";
import { Observable, catchError, throwError } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		return next.handle().pipe(
			map((data) => ({
				success: true,
				data,
				message: "Request successful"
			})),
			catchError((error) => {

				if (error instanceof HttpException) {
					const response = error.getResponse(); 			
					
					return throwError(() => 
						new HttpException(
							{
								success: false,
								error: response, 
							}, 
							error.getStatus()
						)
					);
				}

				
				return throwError(() => 
					new HttpException(
						{
							success: false,
							error: error.message || "Internal Server Error"
						}, 
						HttpStatus.INTERNAL_SERVER_ERROR
					)
				);
			})
		);
	}
}
