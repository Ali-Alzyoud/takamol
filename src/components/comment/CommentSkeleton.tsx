import { IonSkeletonText } from '@ionic/react';
import styles from './CommentItem.module.css';

export const CommentSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.commentBody}>
        <IonSkeletonText animated style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }} />
        <div className={styles.content} style={{ width: '100%' }}>
          <div className={styles.header}>
            <IonSkeletonText animated style={{ width: '100px', height: '1rem' }} />
            <IonSkeletonText animated style={{ width: '80px', height: '1rem' }} />
          </div>
          <IonSkeletonText animated style={{ width: '100%', height: '3rem', marginTop: '0.5rem' }} />
          <div className={styles.actions}>
            <IonSkeletonText animated style={{ width: '80px', height: '1rem' }} />
          </div>
        </div>
      </div>
    </div>
  );
}; 