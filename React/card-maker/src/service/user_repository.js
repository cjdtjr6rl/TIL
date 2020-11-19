import { firebaseDatabase } from './firebase';

class UserRepository {
    syncUsers(userId, onUpdate) {
        const ref = firebaseDatabase.ref(`users/`);
        ref.on('value', snapshot => {
            const value = snapshot.val();
            value && onUpdate(value);
        });
        return () => ref.off();
    }
}

export default UserRepository;