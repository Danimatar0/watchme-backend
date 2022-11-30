import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LocationModule } from './location.module';
import { AppLoggerMiddleware } from './middlewares/AppLoggerMiddleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users.module';
import { AuthMiddleware } from './middlewares/authMiddleware';

@Module({
  imports: [LocationModule, UserModule, MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: "mongodb+srv://danim:Dani.matar2@firstcluster.l3nct.mongodb.net/watchme?retryWrites=true&w=majority",
    }),
  })],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes("/location");
    consumer.apply(AuthMiddleware).forRoutes("/profile");
  }
}
