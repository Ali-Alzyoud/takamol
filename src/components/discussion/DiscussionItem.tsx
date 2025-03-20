import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonImg, IonText, useIonRouter } from '@ionic/react';
import { bookmark } from 'ionicons/icons';
import { Topic } from '../../types/community';
import getAvatar from '../../utils/getAvatar';
import { paths } from '../../utils/paths';
import styles from './DiscussionItem.module.css';
import { useState } from 'react';
interface Props {
  topic: Topic;
  isSaved?: boolean;
}

export const DiscussionItem: React.FC<Props> = ({ topic, isSaved }) => {
  const router = useIonRouter();

  const [saved, setSaved] = useState(isSaved);

  return (
    <IonCard className={styles.card} onClick={() => router.push(`${paths.topic}/${topic.id}`)}>
      <IonCardHeader>
        <div className={styles.header}>
          <div className={styles.authorInfo}>
            <IonImg src={getAvatar(topic.user.toString())} alt={topic?.user?.toString()} className={styles.avatar} />
            <IonText >User {topic.user}</IonText>
          </div>
          <IonText >{new Date(topic.created_at).toLocaleDateString()}</IonText>
        </div>
        <IonCardTitle color="primary" className={styles.title}>{topic.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText color="medium">{topic.content}</IonText>
        <div className={styles.footer}>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <IonText color="medium">0 Comments</IonText>
            </div>
          </div>
          <IonIcon
            icon={bookmark}
            color={saved ? 'primary' : 'medium'}
            className={styles.bookmark}
            onClick={(e) => {
              e.stopPropagation();
              setSaved(p => !p);
              // TODO: Implement save functionality
            }}
          />
        </div>
      </IonCardContent>
    </IonCard>
  );
}; 