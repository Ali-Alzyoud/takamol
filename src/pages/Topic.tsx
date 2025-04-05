import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Topic } from '../types/community';
import { TopicDetails } from '../components/discussion/TopicDetails';
import styles from './Topic.module.css';
import { paths } from '../utils/paths';
import { arrowBackOutline, arrowForward } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../hooks/useAlert';
import {
  bookmarkTopic,
  createComment,
  getTopic,
  getTopicComments,
  likeComment,
  likeTopic,
  replyToComment,
  unbookmarkTopic,
  unlikeComment,
  unlikeTopic,
} from '../api/community';

export const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { i18n, t } = useTranslation();
  const { showAlert } = useAlert();

  const { data: topic, isLoading: isTopicLoading, error: topicError } = useQuery({
    queryKey: ['topic', id],
    queryFn: () => getTopic(id)
  });

  const { data: comments = [], isLoading: isCommentsLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getTopicComments(id),
    enabled: !!topic // Only fetch comments when topic is loaded
  });

  const likeMutation = useMutation({
    mutationFn: async (topicId: number) => {
      const currentTopic = queryClient.getQueryData<Topic>(['topic', id]);
      if (currentTopic?.is_liked) {
        await unlikeTopic(topicId);
      } else {
        await likeTopic(topicId);
      }
    },
    onError: (error) => {
      showAlert(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topic', id] });
    }
  });

  const bookmarkMutation = useMutation({
    mutationFn: async (topicId: number) => {
      const currentTopic = queryClient.getQueryData<Topic>(['topic', id]);
      if (currentTopic?.is_bookmarked) {
        await unbookmarkTopic(topicId);
      } else {
        await bookmarkTopic(topicId);
      }
    },
    onError: (error) => {
      showAlert(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topic', id] });
    }
  });

  const commentMutation = useMutation({
    mutationFn: async ({ topicId, content }: { topicId: number; content: string }) => {
      await createComment({ topicId, content });
    },
    onError: (error) => {
      showAlert(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      queryClient.invalidateQueries({ queryKey: ['topic', id] }); // Update comment count
    }
  });

  const replyMutation = useMutation({
    mutationFn: async ({ topicId, commentId, content }: { topicId: number; commentId: number; content: string }) => {
      await replyToComment({ topicId, commentId, content });
    },
    onError: (error) => {
      showAlert(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      queryClient.invalidateQueries({ queryKey: ['topic', id] }); // Update comment count
    }
  });

  const commentLikeMutation = useMutation({
    mutationFn: async ({ topicId, commentId }: { topicId: number; commentId: number }) => {
      const currentComment = comments.find(c => c.id === commentId);
      if (currentComment?.is_liked) {
        await unlikeComment({ topicId, commentId });
      } else {
        await likeComment({ topicId, commentId });
      }
    },
    onError: (error) => {
      showAlert(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    }
  });

  if (topicError) {
    showAlert(topicError);
  }

  return (
    <IonPage>
      <IonHeader className="ion-padding">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={paths.discussions} text={""} icon={i18n.language === 'ar' ? arrowForward : arrowBackOutline} />
          </IonButtons>
          <IonTitle className="ion-no-padding">{t('discussion')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {isTopicLoading ? (
          <div className={styles.loadingContainer}>
            <IonSpinner />
          </div>
        ) : topicError ? (
          <div className={styles.errorContainer}>
            <IonText color="danger">{t('genericError')}</IonText>
          </div>
        ) : topic ? (
          <TopicDetails
            topic={topic}
            comments={comments}
            isCommentsLoading={isCommentsLoading}
            onLike={(topicId) => likeMutation.mutate(topicId)}
            onSave={(topicId) => bookmarkMutation.mutate(topicId)}
            onComment={(topicId, content) => commentMutation.mutate({ topicId, content })}
            onReply={(topicId, commentId, content) =>
              replyMutation.mutate({ topicId, commentId, content })}
            onLikeComment={(topicId, commentId) => 
              commentLikeMutation.mutate({ topicId, commentId })}
          />
        ) : null}
      </IonContent>
    </IonPage>
  );
}; 