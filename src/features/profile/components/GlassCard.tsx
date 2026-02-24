import React from 'react';
import { motion } from 'framer-motion';
import type { MotionStyle } from 'framer-motion';
import classnames from 'classnames';
import { Tilt } from '@/components/ui/Tilt';
import styles from '../ProfilePage.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tilt?: boolean;
}

export const GlassCard: React.FC<Props> = ({ children, className, delay = 0, tilt = true }) => {
  const motionStyle: MotionStyle = {};

  const content = (
    <motion.div
      className={classnames(styles.glassCard, className)}
      style={motionStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.cardShine} />
      {children}
    </motion.div>
  );

  if (tilt) {
    return (
      <Tilt rotationFactor={4} springOptions={{ stiffness: 300, damping: 20 }}>
        {content}
      </Tilt>
    );
  }

  return content;
};
