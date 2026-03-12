import React, { useState } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  ThumbUpOutlined,
  ThumbUpRounded,
  ChatBubbleOutline,
  CheckCircleOutline,
  PendingOutlined,
  CancelOutlined,
  NewReleasesOutlined,
  BuildOutlined,
} from '@mui/icons-material';
import type { Idea, IdeaStatus } from '../types';
import {
  IDEA_STATUS_LABELS,
  IDEA_STATUS_COLORS,
  IDEA_CATEGORY_LABELS,
  IDEA_CATEGORY_COLORS,
} from '../types';
import { getInitials, formatCount, formatRelativeDate, getCategoryColor } from '../utils';
import styles from '../IdeasPage.module.scss';

const STATUS_ICONS: Record<IdeaStatus, React.ReactNode> = {
  new: <NewReleasesOutlined sx={{ fontSize: 16 }} />,
  review: <PendingOutlined sx={{ fontSize: 16 }} />,
  approved: <CheckCircleOutline sx={{ fontSize: 16 }} />,
  rejected: <CancelOutlined sx={{ fontSize: 16 }} />,
  implemented: <BuildOutlined sx={{ fontSize: 16 }} />,
};

interface Props {
  idea: Idea;
  onVote?: (id: string) => void;
  onStatusChange?: (id: string, status: IdeaStatus) => void;
}

export const IdeaCard: React.FC<Props> = React.memo(({ idea, onVote, onStatusChange }) => {
  const [menuAnchor, setMenuAnchor] = useState<{ x: number; y: number } | null>(null);

  const statusColor = IDEA_STATUS_COLORS[idea.status];
  const categoryColor = getCategoryColor(idea.category, IDEA_CATEGORY_COLORS);

  const handleContextMenu = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (onStatusChange) {
      setMenuAnchor({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCloseMenu = (): void => setMenuAnchor(null);

  const handleStatusClick = (status: IdeaStatus): void => {
    onStatusChange?.(idea.id, status);
    handleCloseMenu();
  };

  const handleVoteClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onVote?.(idea.id);
  };

  return (
    <>
      <article className={styles.card} onContextMenu={handleContextMenu}>
        <div className={styles.cardTop}>
          <span
            className={styles.cardStatusBadge}
            style={{
              color: statusColor,
              background: alpha(statusColor, 0.1),
            }}
          >
            {IDEA_STATUS_LABELS[idea.status]}
          </span>
          <span
            className={styles.cardCategoryBadge}
            style={{
              color: categoryColor,
              background: alpha(categoryColor, 0.08),
            }}
          >
            {IDEA_CATEGORY_LABELS[idea.category]}
          </span>
        </div>

        <h3 className={styles.cardTitle}>{idea.title}</h3>
        <p className={styles.cardDescription}>{idea.description}</p>

        {idea.tags.length > 0 && (
          <div className={styles.cardTags}>
            {idea.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.cardTag}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.cardFooter}>
          <div className={styles.cardAuthor}>
            <Avatar
              sx={{
                width: 18,
                height: 18,
                fontSize: '0.5rem',
                fontWeight: 600,
                bgcolor: alpha(categoryColor, 0.08),
                color: categoryColor,
              }}
            >
              {getInitials(idea.authorName)}
            </Avatar>
            <div>
              <span className={styles.cardAuthorName}>{idea.authorName}</span>
              <span className={styles.cardDate}>
                {' · '}
                {formatRelativeDate(idea.createdAt)}
              </span>
            </div>
          </div>

          <div className={styles.cardStats}>
            <button
              type="button"
              className={styles.cardStat}
              onClick={onVote ? handleVoteClick : undefined}
              style={{
                cursor: onVote ? 'pointer' : 'default',
                border: 'none',
                background: 'none',
                padding: 0,
              }}
              title={idea.hasVoted ? 'Снять голос' : 'Поддержать'}
            >
              {idea.hasVoted ? (
                <ThumbUpRounded sx={{ fontSize: 11, color: 'primary.main' }} />
              ) : (
                <ThumbUpOutlined sx={{ fontSize: 11 }} />
              )}
              {formatCount(idea.votesCount)}
            </button>
            <span className={styles.cardStat}>
              <ChatBubbleOutline sx={{ fontSize: 11 }} />
              {formatCount(idea.commentsCount)}
            </span>
          </div>
        </div>
      </article>

      {onStatusChange && (
        <Menu
          open={Boolean(menuAnchor)}
          onClose={handleCloseMenu}
          anchorReference="anchorPosition"
          anchorPosition={menuAnchor ? { top: menuAnchor.y, left: menuAnchor.x } : undefined}
          MenuListProps={{ sx: { py: 0, minWidth: 200 } }}
          slotProps={{ paper: { sx: { mt: 1.5 } } }}
        >
          <MenuItem disabled sx={{ fontSize: '0.7rem', opacity: 0.8 }}>
            Изменить статус
          </MenuItem>
          {(['new', 'review', 'approved', 'rejected', 'implemented'] as const).map((status) => (
            <MenuItem
              key={status}
              onClick={() => handleStatusClick(status)}
              sx={{
                fontSize: '0.8125rem',
                gap: 1,
                color: idea.status === status ? IDEA_STATUS_COLORS[status] : 'text.primary',
                fontWeight: idea.status === status ? 600 : 400,
              }}
            >
              {STATUS_ICONS[status]}
              {IDEA_STATUS_LABELS[status]}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
});
