import React, { useCallback } from 'react';
import { Card, CardContent, Typography, Box, Avatar, Tabs, Tab } from '@mui/material';
import { Cake, PersonAdd, EmojiEvents } from '@mui/icons-material';
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

interface PersonCardProps {
  fullName: string;
  subtitle: string;
  avatarUrl?: string;
}

const PersonCard: React.FC<PersonCardProps> = React.memo(({ fullName, subtitle, avatarUrl }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      py: 1,
      px: 1.5,
      mx: -1.5,
      borderRadius: 2,
      transition: 'background 0.15s',
      '&:hover': { background: 'rgba(0,0,0,0.02)' },
    }}
  >
    <Avatar
      src={avatarUrl}
      sx={{ width: 44, height: 44, bgcolor: 'primary.main', fontSize: '0.85rem' }}
    >
      {getInitials(fullName)}
    </Avatar>
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Typography variant="body2" fontWeight={600} noWrap>
        {fullName}
      </Typography>
      <Typography variant="caption" color="text.secondary" noWrap>
        {subtitle}
      </Typography>
    </Box>
  </Box>
));

const TAB_ICONS = [
  <Cake key="cake" sx={{ fontSize: 18 }} />,
  <PersonAdd key="person" sx={{ fontSize: 18 }} />,
  <EmojiEvents key="trophy" sx={{ fontSize: 18 }} />,
];

export const PeopleCarousel: React.FC<Props> = React.memo(
  ({ birthdays, newEmployees, anniversaries }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number): void => {
      setActiveTab(newValue);
    }, []);

    return (
      <Card>
        <CardContent>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 2 }}
          >
            <Tab icon={TAB_ICONS[0]} iconPosition="start" label="Дни рождения" />
            <Tab icon={TAB_ICONS[1]} iconPosition="start" label="Новые сотрудники" />
            <Tab icon={TAB_ICONS[2]} iconPosition="start" label="Юбилеи" />
          </Tabs>

          {activeTab === 0 && (
            <Box>
              {birthdays.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ py: 2, textAlign: 'center' }}
                >
                  Нет именинников
                </Typography>
              ) : (
                birthdays.map((person) => (
                  <PersonCard
                    key={person.id}
                    fullName={person.fullName}
                    subtitle={`${person.position} · ${person.date}`}
                    avatarUrl={person.avatarUrl}
                  />
                ))
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              {newEmployees.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ py: 2, textAlign: 'center' }}
                >
                  Нет новых сотрудников
                </Typography>
              ) : (
                newEmployees.map((person) => (
                  <PersonCard
                    key={person.id}
                    fullName={person.fullName}
                    subtitle={`${person.position} · ${person.hireDate}`}
                    avatarUrl={person.avatarUrl}
                  />
                ))
              )}
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              {anniversaries.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ py: 2, textAlign: 'center' }}
                >
                  Нет юбиляров
                </Typography>
              ) : (
                anniversaries.map((person) => (
                  <PersonCard
                    key={person.id}
                    fullName={person.fullName}
                    subtitle={`${person.position} · ${person.years} лет в компании`}
                    avatarUrl={person.avatarUrl}
                  />
                ))
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    );
  },
);
