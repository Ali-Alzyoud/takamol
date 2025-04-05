import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonImg, IonItem, IonText, IonTextarea } from '@ionic/react';
import { bookmark, bookmarkOutline, heart, heartOutline } from 'ionicons/icons';
import { Topic, Comment } from '../../types/community';
import { CommentItem } from '../comment/CommentItem';
import { useState } from 'react';
import styles from './TopicDetails.module.css';
import getAvatar from '../../utils/getAvatar';
import { CommentSkeleton } from '../comment/CommentSkeleton';
import { useTranslation } from 'react-i18next';

interface Props {
  topic: Topic;
  comments: Comment[];
  isCommentsLoading?: boolean;
  onLike: (topicId: number) => void;
  onSave: (topicId: number) => void;
  onComment: (topicId: number, content: string) => void;
  onReply: (topicId: number, commentId: number, content: string) => void;
  onLikeComment: (topicId: number, commentId: number) => void;
}

export const TopicDetails: React.FC<Props> = ({
  topic,
  comments,
  isCommentsLoading,
  onLike,
  onSave,
  onComment,
  onReply,
  onLikeComment
}) => {
  const [newComment, setNewComment] = useState('');
  const { t } = useTranslation();

  return (
    <IonCard className="ion-no-margin">
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
            icon={topic.is_bookmarked ? bookmark : bookmarkOutline}
            color={topic.is_bookmarked ? 'primary' : 'medium'}
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
              icon={topic.is_liked ? heart : heartOutline}
              color={topic.is_liked ? 'primary' : 'medium'}
              className={styles.actionIcon}
            />
            <IonText color="medium">{topic.likes_count || 0}</IonText>
          </div>
        </div>

        {/* Comment Form */}

        <div className={styles.commentsSection}>
          <IonText className={styles.commentsTitle}>
            {topic.comments_count || 0} {t('comments')}
          </IonText>

          <div className={styles.commentForm}>
            <IonTextarea
              label={t('writeComment')}
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
                {t('comment')}
              </IonButton>
            </div>
          </div>

          {/* Comments List */}

          <div className={styles.commentList}>
            {isCommentsLoading ? (
              <>
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
              </>
            ) : comments.map(comment => (
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