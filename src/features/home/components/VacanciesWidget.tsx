import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Divider, Button } from '@mui/material';
import { WorkOutline as WorkIcon, ArrowForward } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { SectionHeader } from '@/components/shared';
import { ROUTES } from '@/lib/constants';
import type { Vacancy } from '@/features/vacancies/types';

interface Props {
  vacancies: Vacancy[];
}

export const VacanciesWidget: React.FC<Props> = React.memo(({ vacancies }) => (
  <Card sx={{ borderLeft: (theme) => `3px solid ${theme.palette.primary.main}` }}>
    <CardContent>
      <SectionHeader
        title="Вакансии"
        linkTo={ROUTES.VACANCIES}
        action={
          <Chip
            label={vacancies.length}
            size="small"
            color="primary"
            sx={{ fontWeight: 700, minWidth: 28, height: 22, fontSize: '0.72rem' }}
          />
        }
      />
      {vacancies.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Нет актуальных вакансий
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {vacancies.map((vacancy, index) => (
            <React.Fragment key={vacancy.id}>
              <Box
                component={Link}
                to={`${ROUTES.VACANCIES}/${vacancy.id}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  py: 1.25,
                  px: 1,
                  mx: -1,
                  borderRadius: 1,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'background 0.15s',
                  '&:hover': { background: 'rgba(0,0,0,0.03)' },
                  '&:hover .vacancy-title': { color: 'primary.main' },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '10px',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <WorkIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                </Box>
                <Typography
                  className="vacancy-title"
                  variant="body2"
                  fontWeight={500}
                  sx={{ flex: 1, minWidth: 0, transition: 'color 0.15s' }}
                  noWrap
                >
                  {vacancy.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  {dayjs(vacancy.publishedAt).format('DD MMM')}
                </Typography>
              </Box>
              {index < vacancies.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
            </React.Fragment>
          ))}
        </Box>
      )}
      <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button
          component={Link}
          to={ROUTES.VACANCIES}
          variant="text"
          color="primary"
          endIcon={<ArrowForward sx={{ fontSize: 14 }} />}
          size="small"
          sx={{ fontWeight: 600, px: 0 }}
        >
          Все вакансии
        </Button>
      </Box>
    </CardContent>
  </Card>
));

VacanciesWidget.displayName = 'VacanciesWidget';
