import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner, IonText } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { Topic } from '../types/community';
import { DiscussionItem } from '../components/discussion/DiscussionItem';
import styles from './Discussion.module.css';

// TODO: Replace with actual API call
const getDiscussions = async (): Promise<Topic[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
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
    }
  ];
};

export const DiscussionPage: React.FC = () => {
  const { data: discussions, isLoading, error } = useQuery({
    queryKey: ['discussions'],
    queryFn: getDiscussions
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Discussions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {isLoading && (
          <div className={styles.loadingContainer}>
            <IonSpinner />
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <IonText color="danger">Failed to load discussions</IonText>
          </div>
        )}

        {discussions && (
          <div className={styles.grid}>
            {discussions.map(topic => (
              <DiscussionItem key={topic.id} topic={topic} />
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}; 