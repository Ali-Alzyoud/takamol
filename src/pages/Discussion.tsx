import { IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonSpinner, IonText, IonToolbar } from '@ionic/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getTopics } from '../api/community';
import { DiscussionItem } from '../components/discussion/DiscussionItem';
import MainHeader from '../components/layout/Header';
import { useAlert } from '../hooks/useAlert';
import { Topic } from '../types/community';
import styles from './Discussion.module.css';

export const DiscussionPage: React.FC = () => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery<Topic[], Error>({
    queryKey: ['discussions'],
    queryFn: ({ pageParam }) => getTopics({ page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    }
  });

  // Handle error separately since onError is not supported in options
  if (error) {
    showAlert(error);
  }

  const handleInfiniteScroll = async (e: CustomEvent<void>) => {
    await fetchNextPage();
    (e.target as HTMLIonInfiniteScrollElement).complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <MainHeader />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <IonSpinner />
          </div>
        ) : isError ? (
          <div className={styles.errorContainer}>
            <IonText color="danger">{t('genericError')}</IonText>
          </div>
        ) : data ? (
          <>
            <div className={styles.grid}>
              {data?.pages?.map((page) =>
                page.map((topic: Topic) => (
                  <DiscussionItem key={topic.id} topic={topic} />
                ))
              )}
            </div>
            <IonInfiniteScroll
              onIonInfinite={handleInfiniteScroll}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              <IonInfiniteScrollContent
                loadingSpinner="bubbles"
                loadingText={t('loading')}
              />
            </IonInfiniteScroll>
          </>
        ) : (
          <div className={styles.errorContainer}>
            <IonText color="danger">{t('genericError')}</IonText>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}; 