import { firebaseDatabase } from './firebase';

class CommentRepository {
    syncComment(userId, onUpdate) {
        const ref = firebaseDatabase.ref(`${userId}/comments`);
        ref.on('value', snapshot => {
            const value = snapshot.val();
            value && onUpdate(value);
        });
        return () => ref.off();
    }

    saveComment(userId, comment) {
        firebaseDatabase.ref(`${userId}/comments/${comment.id}`).set(comment);
    }
}

export default CommentRepository