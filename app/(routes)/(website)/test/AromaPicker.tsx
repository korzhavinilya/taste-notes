'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  SvgIconProps,
  Typography
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import FruitsIcon from '@/components/icons/FruitsIcon';
import FlowerIcon from '@/components/icons/FlowerIcon';
import SandIcon from '@/components/icons/SandIcon';
import MineralIcon from '@/components/icons/MineralIcon';
import VegetablesIcon from '@/components/icons/VegetablesIcon';
import GrassIcon from '@/components/icons/GrassIcon';
import NutsIcon from '@/components/icons/NutsIcon';
import CoffeeIcon from '@/components/icons/CoffeeIcon';
import SpicesIcon from '@/components/icons/SpicesIcon';
import WoodIcon from '@/components/icons/WoodIcon';
import BerriesIcon from '@/components/icons/BerriesIcon';

interface ChildAroma {
  name: string;
  Icon: (props: SvgIconProps) => React.ReactElement;
}

interface Aroma {
  name: string;
  color: string;
  children: ChildAroma[];
}

const aromas: Aroma[] = [
  {
    name: 'Фруктовый',
    color: '#EFE285',
    children: [
      {
        name: 'Фруктовый',
        Icon: FruitsIcon
      },
      {
        name: 'Цитрусы',
        Icon: FruitsIcon
      },
      {
        name: 'Яблоко',
        Icon: FruitsIcon
      },
      {
        name: 'Персик',
        Icon: FruitsIcon
      },
      {
        name: 'Груша',
        Icon: FruitsIcon
      }
    ]
  },
  {
    name: 'Цветочный',
    color: '#BCDAA5',
    children: [
      {
        name: 'Цветочный',
        Icon: FlowerIcon
      },
      {
        name: 'Сирень',
        Icon: FlowerIcon
      },
      {
        name: 'Роза',
        Icon: FlowerIcon
      },
      {
        name: 'Липа',
        Icon: FlowerIcon
      },
      {
        name: 'Пион',
        Icon: FlowerIcon
      }
    ]
  },
  {
    name: 'Почвенный',
    color: '#334515',
    children: [
      {
        name: 'Почвенный',
        Icon: SandIcon
      },
      {
        name: 'Земля',
        Icon: SandIcon
      },
      {
        name: 'Торф',
        Icon: SandIcon
      },
      {
        name: 'Мох',
        Icon: SandIcon
      }
    ]
  },
  {
    name: 'Минеральный',
    color: '#ACBDB1',
    children: [
      {
        name: 'Минеральный',
        Icon: MineralIcon
      },
      {
        name: 'Море',
        Icon: MineralIcon
      },
      {
        name: 'Водоросли',
        Icon: MineralIcon
      },
      {
        name: 'Рыба',
        Icon: MineralIcon
      },
      {
        name: 'Соль',
        Icon: MineralIcon
      }
    ]
  },
  {
    name: 'Овощной',
    color: '#C2D55E',
    children: [
      {
        name: 'Овощной',
        Icon: VegetablesIcon
      },
      {
        name: 'Цукини',
        Icon: VegetablesIcon
      },
      {
        name: 'Горошек',
        Icon: VegetablesIcon
      },
      {
        name: 'Тормат',
        Icon: VegetablesIcon
      },
      {
        name: 'Тыква',
        Icon: VegetablesIcon
      }
    ]
  },
  {
    name: 'Травянистый',
    color: '#575F25',
    children: [
      {
        name: 'Травянистый',
        Icon: GrassIcon
      },
      {
        name: 'Трава',
        Icon: GrassIcon
      },
      {
        name: 'Сено',
        Icon: GrassIcon
      },
      {
        name: 'Лекарственные травы',
        Icon: GrassIcon
      }
    ]
  },
  {
    name: 'Ореховый',
    color: '#D89741',
    children: [
      {
        name: 'Ореховый',
        Icon: NutsIcon
      },
      {
        name: 'Семена',
        Icon: NutsIcon
      },
      {
        name: 'Грецкий',
        Icon: NutsIcon
      },
      {
        name: 'Миндаль',
        Icon: NutsIcon
      }
    ]
  },
  {
    name: 'Кофейный',
    color: '#A37005',
    children: [
      {
        name: 'Кофе',
        Icon: CoffeeIcon
      }
    ]
  },
  {
    name: 'Пряный',
    color: '#C48112',
    children: [
      {
        name: 'Пряный',
        Icon: SpicesIcon
      },
      {
        name: 'Кориандр',
        Icon: SpicesIcon
      },
      {
        name: 'Мята',
        Icon: SpicesIcon
      },
      {
        name: 'Перец',
        Icon: SpicesIcon
      },
      {
        name: 'Ваниль',
        Icon: SpicesIcon
      },
      {
        name: 'Гвоздика',
        Icon: SpicesIcon
      }
    ]
  },
  {
    name: 'Древесный',
    color: '#E54C22',
    children: [
      {
        name: 'Древесный',
        Icon: WoodIcon
      },
      {
        name: 'Уголь',
        Icon: WoodIcon
      },
      {
        name: 'Бочка',
        Icon: WoodIcon
      },
      {
        name: 'Дым',
        Icon: WoodIcon
      },
      {
        name: 'Смола',
        Icon: WoodIcon
      },
      {
        name: 'Хвоя',
        Icon: WoodIcon
      }
    ]
  },
  {
    name: 'Ягодный',
    color: '#D9598B',
    children: [
      {
        name: 'Ягодный',
        Icon: BerriesIcon
      },
      {
        name: 'Смородина',
        Icon: BerriesIcon
      },
      {
        name: 'Малина',
        Icon: BerriesIcon
      },
      {
        name: 'Виноград',
        Icon: BerriesIcon
      },
      {
        name: 'Шиповник',
        Icon: BerriesIcon
      }
    ]
  }
];

export default function TestPage() {
  const [expandedSection, setExpandedSection] = useState<string>();
  const [selectedAromas, setSelectedAromas] = useState(
    new Map<string, string>()
  );
  const [aromasInEachGroup, setAromasInEachGroup] = useState(
    new Map<string, number>()
  );

  return (
    <Stack>
      {aromas.map(({ name: groupName, color, children }) => {
        const isExpanded = groupName === expandedSection;

        return (
          <Accordion
            key={groupName}
            expanded={isExpanded}
            onChange={() => {
              if (isExpanded) {
                setExpandedSection(undefined);
                // setExpandedPanels((panels) =>
                //   panels.filter((panel) => panel !== index)
                // );
              } else {
                setExpandedSection(groupName);
                // setExpandedPanels((panels) => [...panels, index]);
              }
            }}
            elevation={0}
            sx={{
              '& .MuiAccordionSummary-expandIconWrapper': {
                transform: 'none'
              },
              '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'none'
              },
              background: 'none',
              '&:before': {
                display: 'none'
              }
            }}
          >
            <AccordionSummary
              expandIcon={
                <IconButton>
                  {isExpanded ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              }
              sx={{
                padding: 0,
                borderBottom: '1px solid',
                '& .MuiAccordionSummary-content': {
                  display: 'flex',
                  alignItems: 'center'
                }
              }}
            >
              <Badge
                badgeContent={aromasInEachGroup.get(groupName)}
                color="success"
              >
                <Typography mr={1}>{groupName}</Typography>
              </Badge>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {children?.map(({ name: aromaName, Icon }) => {
                  const isSelected = selectedAromas.has(aromaName);

                  return (
                    <Grid
                      xs={4}
                      sm={3}
                      md={2}
                      key={aromaName}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Button
                        disableRipple
                        onClick={() => {
                          setSelectedAromas((aromas) => {
                            const newAromas = new Map(aromas);
                            let count = aromasInEachGroup.get(groupName) || 0;

                            if (newAromas.has(aromaName)) {
                              newAromas.delete(aromaName);
                              count--;
                            } else {
                              newAromas.set(aromaName, groupName);
                              count++;
                            }

                            setAromasInEachGroup((aromasInEachGroup) => {
                              const newAromasInEachGroup = new Map(
                                aromasInEachGroup
                              );
                              newAromasInEachGroup.set(groupName, count);
                              return newAromasInEachGroup;
                            });

                            return newAromas;
                          });
                        }}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px',
                          borderRadius: '8px',
                          backgroundColor: 'transparent',
                          '&:focus': {
                            outline: 'none'
                          },
                          '&:hover': {
                            backgroundColor: 'transparent'
                          },
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover .icon-container': {
                            transform: 'scale(1.1)'
                          }
                        }}
                      >
                        <Box
                          className="icon-container"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            border: 1,
                            borderColor: isSelected ? color : 'transparent',
                            backgroundColor: isSelected ? 'transparent' : color,
                            mb: 1,
                            transition:
                              'background-color 0.3s ease, transform 0.3s ease'
                          }}
                        >
                          <Icon
                            className="icon"
                            sx={{
                              fontSize: 20,
                              color: isSelected ? color : 'white',
                              transition: 'color 0.3s ease'
                            }}
                          />
                        </Box>
                        <Typography variant="caption" color="black">
                          {aromaName}
                        </Typography>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
}
