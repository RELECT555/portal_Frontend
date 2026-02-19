import React, { useCallback, useMemo } from 'react';
import { Card, CardContent, Typography, Box, Avatar, Tabs, Tab, Chip } from '@mui/material';
import { Cake, PersonAdd, EmojiEvents } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
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
      sx={{
        width: 48,
        height: 48,
        bgcolor: 'primary.main',
        fontSize: '0.9rem',
        border: '2px solid',
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.15),
      }}
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

export const PeopleCarousel: React.FC<Props> = React.memo(
  ({ birthdays, newEmployees, anniversaries }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number): void => {
      setActiveTab(newValue);
    }, []);

    const tabData = useMemo(
      () => [
        { icon: <Cake sx={{ fontSize: 16 }} />, label: 'Дни рождения', count: birthdays.length },
        { icon: <PersonAdd sx={{ fontSize: 16 }} />, label: 'Новые', count: newEmployees.length },
        {
          icon: <EmojiEvents sx={{ fontSize: 16 }} />,
          label: 'Юбилеи',
          count: anniversaries.length,
        },
      ],
      [birthdays.length, newEmployees.length, anniversaries.length],
    );

    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              mb: 2,
              '& .MuiTab-root': {
                minHeight: 44,
                borderRadius: '10px',
                mx: 0.5,
                transition: 'background 0.15s',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                },
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            {tabData.map((tab, idx) => (
              <Tab
                key={idx}
                icon={tab.icon}
                iconPosition="start"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    {tab.label}
                    {tab.count > 0 && (
                      <Chip
                        label={tab.count}
                        size="small"
                        sx={{
                          height: 18,
                          minWidth: 18,
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          bgcolor: (theme) =>
                            activeTab === idx
                              ? alpha(theme.palette.primary.main, 0.1)
                              : 'rgba(0,0,0,0.06)',
                          color: activeTab === idx ? 'primary.main' : 'text.secondary',
                        }}
                      />
                    )}
                  </Box>
                }
              />
            ))}
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

PersonCard.displayName = 'PersonCard';
PeopleCarousel.displayName = 'PeopleCarousel';
