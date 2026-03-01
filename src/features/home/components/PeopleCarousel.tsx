import React, { useMemo } from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { Cake, PersonAdd, EmojiEvents } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import type { BirthdayPerson, NewEmployee, AnniversaryPerson } from '@/features/birthdays/types';

interface Props {
  birthdays: BirthdayPerson[];
  newEmployees: NewEmployee[];
  anniversaries: AnniversaryPerson[];
}

function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

interface PersonItemProps {
  fullName: string;
  subtitle: string;
  avatarUrl?: string;
  accentColor: string;
  index: number;
}

const PersonItem: React.FC<PersonItemProps> = React.memo(
  ({ fullName, subtitle, avatarUrl, accentColor, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          py: 0.75,
          px: 1,
          borderRadius: 2,
          transition: 'background 0.15s ease',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.02)',
          },
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: 32,
            height: 32,
            fontSize: '0.7rem',
            fontWeight: 600,
            bgcolor: alpha(accentColor, 0.08),
            color: accentColor,
            flexShrink: 0,
          }}
        >
          {getInitials(fullName)}
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, fontSize: '0.78rem', lineHeight: 1.3 }}
            noWrap
          >
            {fullName}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.disabled', fontSize: '0.675rem', lineHeight: 1.3 }}
            noWrap
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  ),
);

interface ColumnProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  count: number;
  children: React.ReactNode;
  emptyText: string;
}

const PeopleColumn: React.FC<ColumnProps> = React.memo(
  ({ icon, label, color, count, children, emptyText }) => (
    <Box sx={{ minWidth: 0, flex: 1 }}>
      {/* Column header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          mb: 1.5,
          pb: 1,
          borderBottom: `1.5px solid ${alpha(color, 0.15)}`,
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(color, 0.08),
            '& .MuiSvgIcon-root': { fontSize: 14, color },
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, fontSize: '0.75rem', color: 'text.primary' }}
        >
          {label}
        </Typography>
        {count > 0 && (
          <Box
            sx={{
              ml: 'auto',
              fontSize: '0.625rem',
              fontWeight: 700,
              color,
              bgcolor: alpha(color, 0.08),
              borderRadius: 1,
              px: 0.75,
              py: 0.125,
              lineHeight: 1.5,
            }}
          >
            {count}
          </Box>
        )}
      </Box>

      {/* Items */}
      {count === 0 ? (
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.725rem', px: 1 }}>
          {emptyText}
        </Typography>
      ) : (
        children
      )}
    </Box>
  ),
);

export const PeopleCarousel: React.FC<Props> = React.memo(
  ({ birthdays, newEmployees, anniversaries }) => {
    const colors = useMemo(
      () => ({
        birthdays: '#ec4899',
        newEmployees: '#0d9488',
        anniversaries: '#f59e0b',
      }),
      [],
    );

    return (
      <Box
        sx={{
          height: '100%',
          borderRadius: 3,
          border: '1px solid rgba(0,0,0,0.06)',
          bgcolor: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          overflow: 'hidden',
          p: 2.5,
        }}
      >
        {/* Three columns */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            height: '100%',
          }}
        >
          {/* Birthdays */}
          <PeopleColumn
            icon={<Cake />}
            label="Дни рождения"
            color={colors.birthdays}
            count={birthdays.length}
            emptyText="Нет именинников"
          >
            {birthdays.map((person, i) => (
              <PersonItem
                key={person.id}
                fullName={person.fullName}
                subtitle={`${person.position} · ${person.date}`}
                avatarUrl={person.avatarUrl}
                accentColor={colors.birthdays}
                index={i}
              />
            ))}
          </PeopleColumn>

          {/* New employees */}
          <PeopleColumn
            icon={<PersonAdd />}
            label="Новые сотрудники"
            color={colors.newEmployees}
            count={newEmployees.length}
            emptyText="Нет новых сотрудников"
          >
            {newEmployees.map((person, i) => (
              <PersonItem
                key={person.id}
                fullName={person.fullName}
                subtitle={`${person.position} · ${person.hireDate}`}
                avatarUrl={person.avatarUrl}
                accentColor={colors.newEmployees}
                index={i}
              />
            ))}
          </PeopleColumn>

          {/* Anniversaries */}
          <PeopleColumn
            icon={<EmojiEvents />}
            label="Юбилеи"
            color={colors.anniversaries}
            count={anniversaries.length}
            emptyText="Нет юбиляров"
          >
            {anniversaries.map((person, i) => (
              <PersonItem
                key={person.id}
                fullName={person.fullName}
                subtitle={`${person.position} · ${person.years} лет`}
                avatarUrl={person.avatarUrl}
                accentColor={colors.anniversaries}
                index={i}
              />
            ))}
          </PeopleColumn>
        </Box>
      </Box>
    );
  },
);

PersonItem.displayName = 'PersonItem';
PeopleColumn.displayName = 'PeopleColumn';
PeopleCarousel.displayName = 'PeopleCarousel';
