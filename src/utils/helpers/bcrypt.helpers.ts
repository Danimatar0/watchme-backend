import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export function bcryptHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltOrRounds, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
}

export function generateSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltOrRounds, (err, salt) => {
            if (err) {
                reject(err);
            }
            resolve(salt);
        });
    });
}

export function verifyHash(newPassword: string, dbHash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        console.log('verifying hash');
        bcrypt.compare(newPassword, dbHash, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}