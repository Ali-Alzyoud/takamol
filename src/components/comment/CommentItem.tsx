import { IonButton, IonIcon, IonImg, IonText, IonTextarea } from '@ionic/react';
import { heart, heartOutline, arrowUndo } from 'ionicons/icons';
import { Comment } from '../../types/community';
import { useState } from 'react';
import styles from './CommentItem.module.css';
import getAvatar from '../../utils/getAvatar';

interface Props {
  comment: Comment;
  onReply: (commentId: number) => void;
  onLike: (commentId: number) => void;
  level?: number;
  isLiked?: boolean;
}

export const CommentItem: React.FC<Props> = ({ comment, onReply, onLike, level = 0, isLiked }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  return (
    <div className={`${styles.container} ${level > 0 ? styles.nested : ''}`}>
      <div className={styles.commentBody}>
        <IonImg src={getAvatar(comment.user.toString())} alt="User avatar" className={styles.avatar} />
        <div className={styles.content}>
          <div className={styles.header}>
            <IonText className={styles.userName}>User {comment.user}</IonText>
            <IonText color="medium">·</IonText>
            <IonText color="medium">{new Date(comment.created_at).toLocaleDateString()}</IonText>
          </div>
          <IonText className={styles.text}>{comment.content}</IonText>
          <div className={styles.actions}>
            <div className={styles.actionButton} onClick={() => onLike(comment.id)}>
              <IonIcon
                icon={isLiked ? heart : heartOutline}
                color={isLiked ? 'primary' : 'medium'}
              />
              <IonText color="medium">0</IonText>
            </div>
            <div
              className={styles.actionButton}
              onClick={() => setShowReplyForm(prev => !prev)}
            >
              <IonIcon icon={arrowUndo} color="medium" />
              <IonText color="medium">Reply</IonText>
            </div>
          </div>
        </div>
      </div>

      {/* Reply form */}
      {showReplyForm && (
        <div className={styles.replyForm}>
          <IonTextarea
            label="Write a reply..."
            rows={3}
            autoGrow
            fill='solid'
            value={replyContent}
            labelPlacement='floating'
            onIonInput={(e) => setReplyContent(e.detail.value ?? '')}
          />
          <div className={styles.formActions}>
            <IonButton fill="clear" onClick={() => {
              setShowReplyForm(false);
              setReplyContent('');
            }}>Cancel</IonButton>
            <IonButton onClick={() => {
              onReply(comment.id);
              setShowReplyForm(false);
              setReplyContent('');
            }} disabled={!replyContent.trim()}>Reply</IonButton>
          </div>
        </div>
      )}

      {/* Replies */}
      {comment.replies && Object.values(comment.replies).map(reply => (
        <CommentItem
          key={reply.id}
          comment={reply}
          onReply={onReply}
          onLike={onLike}
          level={level + 1}
        />
      ))}
    </div>
  );
}; 