import React from 'react';
import styles from './SharedPage.module.scss';

interface Props {
  tags: string[];
  max?: number;
  prefix?: string;
  className?: string;
  tagClassName?: string;
}

export const TagList: React.FC<Props> = React.memo(
  ({ tags, max = 3, prefix = '#', className, tagClassName }) => {
    const visible = max > 0 ? tags.slice(0, max) : tags;

    if (visible.length === 0) return null;

    return (
      <div className={`${styles.tagList} ${className ?? ''}`}>
        {visible.map((tag) => (
          <span key={tag} className={`${styles.tag} ${tagClassName ?? ''}`}>
            {prefix}
            {tag}
          </span>
        ))}
      </div>
    );
  },
);
