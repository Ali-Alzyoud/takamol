import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonImg, IonItem, IonText, IonTextarea } from '@ionic/react';
import { bookmark, bookmarkOutline, heart, heartOutline } from 'ionicons/icons';
import { Topic, Comment } from '../../types/community';
import { CommentItem } from '../comment/CommentItem';
import { useState } from 'react';
import styles from './TopicDetails.module.css';
import getAvatar from '../../utils/getAvatar';

interface Props {
  topic: Topic;
  comments: Comment[];
  isLiked?: boolean;
  isSaved?: boolean;
  onLike: (topicId: number) => void;
  onSave: (topicId: number) => void;
  onComment: (topicId: number, content: string) => void;
  onReply: (topicId: number, commentId: number, content: string) => void;
  onLikeComment: (topicId: number, commentId: number) => void;
}

export const TopicDetails: React.FC<Props> = ({
  topic,
  comments,
  isLiked,
  isSaved,
  onLike,
  onSave,
  onComment,
  onReply,
  onLikeComment
}) => {
  const [newComment, setNewComment] = useState('');

  return (
    <IonCard>
      <IonCardHeader>
        <div className={styles.header}>
          <div className={styles.authorInfo}>
            <IonImg src={getAvatar(topic.user.toString())} alt="User avatar" className={styles.avatar} />
            <div className={styles.authorMeta}>
              <IonText>User {topic.user}</IonText>
              <IonText color="medium" className={styles.date}>
                {new Date(topic.created_at).toLocaleDateString()}
              </IonText>
            </div>
          </div>
          <IonIcon
            icon={isSaved ? bookmark : bookmarkOutline}
            color={isSaved ? 'primary' : 'medium'}
            className={styles.bookmarkIcon}
            onClick={() => onSave(topic.id)}
          />
        </div>
        <IonCardTitle className={styles.title}>{topic.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText className={styles.content}>{topic.content}</IonText>

        <div className={styles.actions}>
          <div className={styles.actionButton} onClick={() => onLike(topic.id)}>
            <IonIcon
              icon={isLiked ? heart : heartOutline}
              color={isLiked ? 'primary' : 'medium'}
              className={styles.actionIcon}
            />
            <IonText color="medium">0</IonText>
          </div>
        </div>

        <div className={styles.commentsSection}>
          <IonText className={styles.commentsTitle}>
            {comments.length} Comments
          </IonText>

          <div className={styles.commentForm}>
            <IonTextarea
              label="Write a comment..."
              labelPlacement='floating'
              fill='solid'
              rows={4}
              autoGrow
              value={newComment}
              onIonInput={(e) => setNewComment(e.detail.value ?? '')}
            />


            <div className={styles.formActions}>
              <IonButton
                onClick={() => {
                  onComment(topic.id, newComment);
                  setNewComment('');
                }}
                disabled={!newComment.trim()}
              >
                Comment
              </IonButton>
            </div>
          </div>

          <div className={styles.commentList}>
            {comments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={(commentId) => onReply(topic.id, commentId, '')}
                onLike={(commentId) => onLikeComment(topic.id, commentId)}
              />
            ))}
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
}; 