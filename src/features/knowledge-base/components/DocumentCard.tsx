import React from 'react';
import {
  VisibilityOutlined,
  FileDownloadOutlined,
  PushPinRounded,
  OpenInNewRounded,
  StorageRounded,
} from '@mui/icons-material';
import type { KBDocument } from '../types';
import { KB_FILE_TYPE_LABELS } from '../types';
import { formatViewCount, formatDate, getFileTypeColor } from '../utils';
import styles from '../KnowledgeBasePage.module.scss';

interface Props {
  document: KBDocument;
}

export const DocumentCard: React.FC<Props> = React.memo(({ document: doc }) => {
  const fileColor = getFileTypeColor(doc.fileType);

  return (
    <article className={`${styles.documentCard} ${doc.isPinned ? styles.documentCardPinned : ''}`}>
      <div className={styles.documentFileIcon} style={{ background: fileColor }}>
        {KB_FILE_TYPE_LABELS[doc.fileType]}
      </div>

      <div className={styles.documentBody}>
        <div className={styles.documentTitleRow}>
          <h3 className={styles.documentTitle}>{doc.title}</h3>
          {doc.isNew && <span className={styles.documentNewBadge}>New</span>}
          {doc.isPinned && (
            <PushPinRounded className={styles.documentPinBadge} sx={{ fontSize: 12 }} />
          )}
        </div>

        <p className={styles.documentDescription}>{doc.description}</p>

        <div className={styles.documentMeta}>
          <span className={styles.documentMetaItem}>{doc.department}</span>
          <span className={styles.documentMetaItem}>{doc.author}</span>
          {doc.fileSize && <span className={styles.documentMetaItem}>{doc.fileSize}</span>}
          {doc.source1C && (
            <span className={styles.sourceBadge}>
              <StorageRounded sx={{ fontSize: 9 }} />
              1С
            </span>
          )}
        </div>

        {doc.tags.length > 0 && (
          <div className={styles.documentTags}>
            {doc.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.documentTag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.documentRight}>
        <div className={styles.documentStats}>
          <span className={styles.documentStat}>
            <VisibilityOutlined sx={{ fontSize: 12 }} />
            {formatViewCount(doc.viewCount)}
          </span>
          <span className={styles.documentStat}>
            <FileDownloadOutlined sx={{ fontSize: 12 }} />
            {doc.downloadCount}
          </span>
        </div>

        <span className={styles.documentDate}>{formatDate(doc.updatedAt)}</span>

        <div className={styles.documentActions}>
          <button type="button" className={styles.documentActionBtn} aria-label="Открыть">
            <OpenInNewRounded sx={{ fontSize: 14 }} />
          </button>
          {doc.fileType !== 'link' && (
            <button type="button" className={styles.documentActionBtn} aria-label="Скачать">
              <FileDownloadOutlined sx={{ fontSize: 14 }} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
});
