import { Log } from '@microsoft/sp-core-library'
import * as React from 'react'

import { FieldCustomizerContext, ListItemAccessor } from '@microsoft/sp-listview-extensibility'
import { SPFI } from '@pnp/sp'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, SxProps, Theme } from '@mui/material'
import { ITheme } from '@microsoft/sp-component-base'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { getLangStrings, ILang } from '../loc/langHelper'

import '@pnp/sp/webs'
import '@pnp/sp/lists'
import '@pnp/sp/items'
import '@pnp/sp/files'
import '@pnp/sp/folders'

export interface IRdDocButtonsProps {
  context: FieldCustomizerContext
  theme: ITheme
  sp: SPFI
  item: ListItemAccessor
}

export enum DocLib {
  Rozpracovane = '16e60be6-ef8f-4477-9c2b-3ea1ada91468',
  Platne = 'a19374d6-b9bd-49ca-a808-a73085a7afc6',
  Archivne = '50f7f4f0-8a38-4890-acf9-a92887454ad7'
}

export const LocaleStrings: ILang = getLangStrings('sk')

const LOG_SOURCE: string = 'RdDocButtons'

const RdDocButtons: React.FC<IRdDocButtonsProps> = (props) => {
  Log.info(LOG_SOURCE, 'React Element: RdDocButtons started')

  const [dialog, setDialog] = React.useState<boolean>(false)
  const [docLib, setDocLib] = React.useState<DocLib>(DocLib.Rozpracovane)
  
  const [isPrDisabled, setIsPrDisabled] = React.useState<boolean>(false)
  const [isScDisabled, setIsScDisabled] = React.useState<boolean>(false)
  const [isPbDisabled, setIsPbDisabled] = React.useState<boolean>(false)
  const [isRmDisabled, setIsRmDisabled] = React.useState<boolean>(false)
  const [isEdDisabled, setIsEdDisabled] = React.useState<boolean>(false)
  const [isReDisabled, setIsReDisabled] = React.useState<boolean>(false)
  const [isArDisabled, setIsArDisabled] = React.useState<boolean>(false)
  const [isAllDisabled, setIsAllDisabled] = React.useState<boolean>(false)

  React.useEffect(() => {
    const currentDocLib = props.context.pageContext.list?.id.toString() as DocLib
    setDocLib(currentDocLib)

    setIsPrDisabled(false)
    setIsScDisabled(false)
    setIsPbDisabled(false)
    setIsRmDisabled(false)
    setIsEdDisabled(false)
    setIsReDisabled(false)
    setIsArDisabled(false)
    setIsAllDisabled(false)
  }, [])

  const deleteFile = (): void => {
    props.sp.web.getFileByServerRelativePath(props.item.getValueByName('FileRef')).recycle().then(() => {
      window.location.reload()
    }).catch((error) => {
      console.error(error)
    })
  }

  const rowButtonProps = (color: string): SxProps<Theme> => {
    return {color: color, border: `solid 2px ${color}`, borderRadius: 2, width: 26, height: 26, fontWeight: 'bold'}
  }

  return (
    <>
      <Dialog
        open={dialog}
        onClose={() => {setDialog(false)}}
      >
        <DialogTitle>
        Vymazať?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Ste si istý, že chcete vymazať {props.item.getValueByName('FileLeafRef')}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setDialog(false)}}>Zrušiť</Button>
          <Button onClick={() => {
            deleteFile()
            setDialog(false)
            }}
          >Potvrdiť</Button>
        </DialogActions>
      </Dialog>
      <Stack direction='row' spacing={0.5}>
        <IconButton
          title={LocaleStrings.Buttons.View}
          sx={rowButtonProps(isAllDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--blue)')}
          size='small'
          disabled={isAllDisabled}
          onClick={(event) => {
        }}>
          <VisibilityOutlinedIcon />
        </IconButton>
        {
          docLib == DocLib.Rozpracovane &&
          <>
            <IconButton
              title={LocaleStrings.Buttons.Edit}
              sx={rowButtonProps(isAllDisabled || isEdDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--yellow)')}
              size='small'
              disabled={isAllDisabled || isEdDisabled}
              onClick={(event) => {
            }}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              title={LocaleStrings.Buttons.Reminders}
              sx={rowButtonProps(isAllDisabled || isPrDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--mint)')}
              size='small'
              disabled={isAllDisabled || isPrDisabled}
              onClick={(event) => {
              }}
            >
              Pr
            </IconButton>
            <IconButton
              title={LocaleStrings.Buttons.Approval}
              sx={rowButtonProps(isAllDisabled || isScDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--teal)')}
              size='small'
              disabled={isAllDisabled || isScDisabled}
              onClick={(event) => {
              }}
            >
              Sc
            </IconButton>
            <IconButton
              title={LocaleStrings.Buttons.Publicize}
              sx={rowButtonProps(isAllDisabled || isPbDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--cyan)')}
              size='small'
              disabled={isAllDisabled || isPbDisabled}
              onClick={(event) => {
              }}
            >
              Pb
            </IconButton>
            <IconButton
              title={LocaleStrings.Buttons.Delete}
              sx={rowButtonProps(isAllDisabled || isRmDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--red)')}
              size='small'
              disabled={isAllDisabled || isRmDisabled}
              onClick={(event) => {
            }}>
              <CloseOutlinedIcon />
            </IconButton>
          </>
        }
        {
          docLib == DocLib.Platne &&
          <>
            <IconButton
              title={'Oboznamovanie'}
              sx={rowButtonProps(false ? 'rgba(0, 0, 0, 0.26)' : 'var(--cyan)')}
              size='small'
              onClick={(event) => {
            }}>
              Ob
            </IconButton>
            <IconButton
              title={'Revízia'}
              sx={rowButtonProps(isReDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--indigo)')}
              size='small'
              disabled={isReDisabled}
              onClick={(event) => {
            }}>
              Re
            </IconButton>
            <IconButton 
              title={LocaleStrings.Buttons.Archivation}
              sx={rowButtonProps(isArDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--purple)')}
              size='small' 
              disabled={isArDisabled}
              onClick={(event) => {
            }}>
              Ar
            </IconButton>
          </>
        }
      </Stack>
    </>
  )
}

export default RdDocButtons
