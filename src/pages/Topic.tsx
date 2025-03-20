import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Topic, Comment } from '../types/community';
import { TopicDetails } from '../components/discussion/TopicDetails';
import styles from './Topic.module.css';
import { paths } from '../utils/paths';
import { arrowBackOutline, arrowForward } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
// TODO: Replace with actual API calls
const getTopic = async (id: string): Promise<Topic> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id: parseInt(id),
    title: "Building Freedom: The Evolution and Power of Freedom Charters",
    content: 'In a world marked by division and dissent, the idea of a "freedom charter" resonates as both a beacon of hope and a blueprint for collective action.',
    topic_type: "discussion",
    user: 1,
    created_at: new Date().toISOString(),
    poll: undefined,
    poll_details: {
      id: 0,
      title: "",
      created_by: 0,
      created_at: new Date().toISOString(),
      is_core_survey: false,
      questions: []
    }
  };
};

const getComments = async (topicId: string): Promise<Comment[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      content: "This is a comment",
      created_at: new Date().toISOString(),
      user: 1,
      topic: 1,
      replies: []
    }
  ];
};

export const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  const { data: topic, isLoading: isTopicLoading, error: topicError } = useQuery({
    queryKey: ['topic', id],
    queryFn: () => getTopic(id)
  });

  const { data: comments = [], isLoading: isCommentsLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id)
  });

  const likeMutation = useMutation({
    mutationFn: async (topicId: number) => {
      // TODO: Implement like functionality
      await new Promise(resolve => setTimeout(resolve, 300));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topic', id] });
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (topicId: number) => {
      // TODO: Implement save functionality
      await new Promise(resolve => setTimeout(resolve, 300));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topic', id] });
    }
  });

  const commentMutation = useMutation({
    mutationFn: async ({ topicId, content }: { topicId: number; content: string }) => {
      // TODO: Implement comment functionality
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    }
  });

  const replyMutation = useMutation({
    mutationFn: async ({ topicId, commentId, content }: { topicId: number; commentId: number; content: string }) => {
      // TODO: Implement reply functionality
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    }
  });

  const isLoading = isTopicLoading || isCommentsLoading;

  return (
    <IonPage>
      <IonHeader className="ion-padding">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={paths.discussions} text={""} icon={i18n.language === 'ar' ? arrowForward : arrowBackOutline} />
          </IonButtons>
          <IonTitle>Discussion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <IonSpinner />
          </div>
        )}

        {topicError && (
          <div className={styles.errorContainer}>
            <IonText color="danger">Failed to load discussion</IonText>
          </div>
        )}
        {topic && (
          <TopicDetails
            topic={topic}
            comments={comments}
            onLike={(topicId) => likeMutation.mutate(topicId)}
            onSave={(topicId) => saveMutation.mutate(topicId)}
            onComment={(topicId, content) => commentMutation.mutate({ topicId, content })}
            onReply={(topicId, commentId, content) =>
              replyMutation.mutate({ topicId, commentId, content })}
            onLikeComment={(topicId, commentId) => {
              // TODO: Implement comment like functionality
            }}
          />
        )}
      </IonContent>
    </IonPage>
  );
}; 