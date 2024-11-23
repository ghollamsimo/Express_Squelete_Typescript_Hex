export class ResetDTO{
    constructor(public readonly resetToken: string, public readonly newPassword: string) {}
}