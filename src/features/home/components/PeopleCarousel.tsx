import React, { useCallback, useMemo } from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { Cake, PersonAdd, EmojiEvents } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import type { BirthdayPerson, NewEmployee, AnniversaryPerson } from '@/features/birthdays/types';

interface Props {
  birthdays: BirthdayPerson[];
  newEmployees: NewEmployee[];
  anniversaries: AnniversaryPerson[];
}

interface TabConfig {
  key: string;
  icon: React.ReactNode;
  label: string;
  count: number;
  color: string;
  gradient: string;
}

function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

interface PersonCardProps {
  fullName: string;
  subtitle: string;
  avatarUrl?: string;
  accentColor: string;
  index: number;
}

const PersonCard: React.FC<PersonCardProps> = React.memo(
  ({ fullName, subtitle, avatarUrl, accentColor, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: 1.25,
          px: 1.5,
          borderRadius: '10px',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          '&:hover': {
            background: alpha(accentColor, 0.04),
            boxShadow: `0 0 0 1px ${alpha(accentColor, 0.08)}`,
          },
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: 42,
            height: 42,
            fontSize: '0.85rem',
            fontWeight: 600,
            background: `linear-gradient(135deg, ${alpha(accentColor, 0.15)} 0%, ${alpha(accentColor, 0.08)} 100%)`,
            color: accentColor,
            border: '2px solid',
            borderColor: alpha(accentColor, 0.12),
          }}
        >
          {getInitials(fullName)}
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, fontSize: '0.8125rem', lineHeight: 1.3 }}
            noWrap
          >
            {fullName}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontSize: '0.6875rem', lineHeight: 1.3 }}
            noWrap
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  ),
);

export const PeopleCarousel: React.FC<Props> = React.memo(
  ({ birthdays, newEmployees, anniversaries }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const tabData: TabConfig[] = useMemo(
      () => [
        {
          key: 'birthdays',
          icon: <Cake sx={{ fontSize: 15 }} />,
          label: 'Дни рождения',
          count: birthdays.length,
          color: '#ec4899',
          gradient: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
        },
        {
          key: 'newEmployees',
          icon: <PersonAdd sx={{ fontSize: 15 }} />,
          label: 'Новые',
          count: newEmployees.length,
          color: '#0d9488',
          gradient: 'linear-gradient(135deg, #0d9488 0%, #6366f1 100%)',
        },
        {
          key: 'anniversaries',
          icon: <EmojiEvents sx={{ fontSize: 15 }} />,
          label: 'Юбилеи',
          count: anniversaries.length,
          color: '#f59e0b',
          gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        },
      ],
      [birthdays.length, newEmployees.length, anniversaries.length],
    );

    const currentTab = tabData[activeTab];

    const handleTabClick = useCallback((idx: number) => {
      setActiveTab(idx);
    }, []);

    return (
      <Card
        sx={{
          height: '100%',
          borderRadius: '14px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: 'none',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          {/* Tabs */}
          <Box
            sx={{
              display: 'flex',
              gap: '4px',
              p: '3px',
              borderRadius: '10px',
              bgcolor: 'rgba(0,0,0,0.04)',
              mb: 2,
            }}
          >
            {tabData.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <Box
                  key={tab.key}
                  component="button"
                  onClick={() => handleTabClick(idx)}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                    py: 0.75,
                    px: 1,
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.6875rem',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: isActive ? '#fff' : 'transparent',
                    color: isActive ? tab.color : 'text.secondary',
                    boxShadow: isActive
                      ? `0 1px 4px rgba(0,0,0,0.08), 0 0 8px ${alpha(tab.color, 0.08)}`
                      : 'none',
                    '&:hover': {
                      color: tab.color,
                    },
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <Box
                      component="span"
                      sx={{
                        minWidth: 16,
                        height: 16,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        fontSize: '0.5625rem',
                        fontWeight: 700,
                        px: 0.5,
                        background: isActive ? alpha(tab.color, 0.1) : 'rgba(0,0,0,0.06)',
                        color: isActive ? tab.color : 'text.secondary',
                      }}
                    >
                      {tab.count}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.key}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === 0 && (
                <>
                  {birthdays.length === 0 ? (
                    <EmptyMessage icon={<Cake />} text="Нет именинников" color={currentTab.color} />
                  ) : (
                    birthdays.map((person, i) => (
                      <PersonCard
                        key={person.id}
                        fullName={person.fullName}
                        subtitle={`${person.position} · ${person.date}`}
                        avatarUrl={person.avatarUrl}
                        accentColor={currentTab.color}
                        index={i}
                      />
                    ))
                  )}
                </>
              )}

              {activeTab === 1 && (
                <>
                  {newEmployees.length === 0 ? (
                    <EmptyMessage
                      icon={<PersonAdd />}
                      text="Нет новых сотрудников"
                      color={currentTab.color}
                    />
                  ) : (
                    newEmployees.map((person, i) => (
                      <PersonCard
                        key={person.id}
                        fullName={person.fullName}
                        subtitle={`${person.position} · ${person.hireDate}`}
                        avatarUrl={person.avatarUrl}
                        accentColor={currentTab.color}
                        index={i}
                      />
                    ))
                  )}
                </>
              )}

              {activeTab === 2 && (
                <>
                  {anniversaries.length === 0 ? (
                    <EmptyMessage
                      icon={<EmojiEvents />}
                      text="Нет юбиляров"
                      color={currentTab.color}
                    />
                  ) : (
                    anniversaries.map((person, i) => (
                      <PersonCard
                        key={person.id}
                        fullName={person.fullName}
                        subtitle={`${person.position} · ${person.years} лет в компании`}
                        avatarUrl={person.avatarUrl}
                        accentColor={currentTab.color}
                        index={i}
                      />
                    ))
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    );
  },
);

interface EmptyMessageProps {
  icon: React.ReactNode;
  text: string;
  color: string;
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({ icon, text, color }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
      gap: 1,
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(color, 0.08)} 0%, ${alpha(color, 0.04)} 100%)`,
        color: alpha(color, 0.3),
        '& .MuiSvgIcon-root': { fontSize: 20 },
      }}
    >
      {icon}
    </Box>
    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
      {text}
    </Typography>
  </Box>
);

PersonCard.displayName = 'PersonCard';
PeopleCarousel.displayName = 'PeopleCarousel';
EmptyMessage.displayName = 'EmptyMessage';
