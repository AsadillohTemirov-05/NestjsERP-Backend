import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    /**
     * TEMPORARY ERP AUTH STRATEGY
     * ---------------------------
     * Hozircha real auth yo‘q.
     * Lekin audit fields majburiy.
     *
     * Shu sabab:
     * - request.user har doim mavjud bo‘ladi
     * - keyin JWT qo‘shilganda shu joy almashtiriladi
     */

    request.user = {
      id: 'system',
      name: 'System User',
    };

    return true;
  }
}
