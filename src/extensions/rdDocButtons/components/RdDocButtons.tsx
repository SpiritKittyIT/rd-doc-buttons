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
  spp: SPFI
  item: ListItemAccessor
}

export enum DocLib {
  Rozpracovane = '16e60be6-ef8f-4477-9c2b-3ea1ada91468',
  Platne = 'a19374d6-b9bd-49ca-a808-a73085a7afc6',
  Archivne = '50f7f4f0-8a38-4890-acf9-a92887454ad7'
}

enum DialogType {
  None, Pr, Sc, Pb, Ob, Re, Ar, Rm
}

export const LocaleStrings: ILang = getLangStrings('sk')

const LOG_SOURCE: string = 'RdDocButtons'

const RdDocButtons: React.FC<IRdDocButtonsProps> = (props) => {
  Log.info(LOG_SOURCE, 'React Element: RdDocButtons started')
  const Source: string = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
  const lstProcesId = '6dc94517-f874-42eb-aa69-5a58011e57e5'

  const [dialog, setDialog] = React.useState<DialogType>(DialogType.None)
  const [docLib, setDocLib] = React.useState<DocLib>(DocLib.Rozpracovane)
  
  const [isPrDisabled, setIsPrDisabled] = React.useState<boolean>(false)
  const [isScDisabled, setIsScDisabled] = React.useState<boolean>(false)
  const [isPbDisabled, setIsPbDisabled] = React.useState<boolean>(false)
  const [isObDisabled, setIsObDisabled] = React.useState<boolean>(false)
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
    setIsObDisabled(false)
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

  const dialogConfirm = (): void => {
    const proces: Record<string, any> = {}

    switch (dialog) {
      case DialogType.Pr:
        proces['acDokId'] = props.item.getValueByName('ID')
        proces['acProcesTyp'] = 'Pripomienkovanie'
        proces['acLib'] = 'acLibRozpracovane'
        props.spp.web.lists.getById(lstProcesId).items.add(proces)
        .catch((err) => {
          console.error(err)
        })
        break
      case DialogType.Sc:
        proces['acDokId'] = props.item.getValueByName('ID')
        proces['acProcesTyp'] = 'Schvalovanie'
        proces['acLib'] = 'acLibRozpracovane'
        props.spp.web.lists.getById(lstProcesId).items.add(proces)
        .catch((err) => {
          console.error(err)
        })
        break
      case DialogType.Pb:
        proces['acDokId'] = props.item.getValueByName('ID')
        proces['acProcesTyp'] = 'Publikovanie'
        proces['acLib'] = 'acLibRozpracovane'
        props.spp.web.lists.getById(lstProcesId).items.add(proces)
        .catch((err) => {
          console.error(err)
        })
        break
      case DialogType.Ob:
        proces['acDokId'] = props.item.getValueByName('ID')
        proces['acProcesTyp'] = 'Oboznamovanie'
        proces['acLib'] = 'acLibPlatne'
        props.spp.web.lists.getById(lstProcesId).items.add(proces)
        .catch((err) => {
          console.error(err)
        })
        break
      case DialogType.Re:
        proces['acDokId'] = props.item.getValueByName('ID')
        proces['acProcesTyp'] = 'Revizia'
        proces['acLib'] = 'acLibPlatne'
        props.spp.web.lists.getById(lstProcesId).items.add(proces)
        .catch((err) => {
          console.error(err)
        })
        break
      case DialogType.Ar:
        proces['acDokId'] = props.item.getValueByName('ID')
        proces['acProcesTyp'] = 'Archivacia'
        proces['acLib'] = 'acLibPlatne'
        props.spp.web.lists.getById(lstProcesId).items.add(proces)
        .catch((err) => {
          console.error(err)
        })
        break
      case DialogType.Rm:
        deleteFile()
        break
      default:
        setDialog(DialogType.None)
    }
    setDialog(DialogType.None)
  }

  const dialogText = (): { title: string; text: string; } => {
    switch (dialog) {
      case DialogType.Pr:
        return {title: `Spustiť pripomienkovanie`, text: ``}
      case DialogType.Sc:
        return {title: `Spustiť schvaľovanie`, text: ``}
      case DialogType.Pb:
        return {title: `Spustiť publikovanie`, text: ``}
      case DialogType.Ob:
        return {title: `Spustiť oboznamovanie`, text: ``}
      case DialogType.Re:
        return {title: `Spustiť revíziu`, text: ``}
      case DialogType.Ar:
        return {title: `Spustiť archiváciu`, text: ``}
      case DialogType.Rm:
        return {title: `Vyhodiť do koša`, text: `Ste si istý, že chcete vymazať ${props.item.getValueByName('FileLeafRef')}?`}
      default:
        return {title: ``, text: ``}
    }
  }

  return (
    <>
      <Dialog
        open={dialog !== DialogType.None}
        onClose={() => {setDialog(DialogType.None)}}
      >
        <DialogTitle>
          {dialogText().title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText().text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setDialog(DialogType.None)}}>Zrušiť</Button>
          <Button onClick={() => {
              dialogConfirm()
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
            window.location.href = `${window.location.protocol}//${window.location.host}/sites/acRdDokumenty/_layouts/15/SPListForm.aspx?PageType=4&List=acLibRozpracovane&ID=${props.item.getValueByName('ID')}&Source=${Source}&ContentTypeId=${props.item.getValueByName('ContentTypeId')}&RootFolder=/sites/acRdDokumenty/acLibRozpracovane`
        }}>
          <VisibilityOutlinedIcon />
        </IconButton>
        {
          docLib === DocLib.Rozpracovane &&
          <>
            <IconButton
              title={LocaleStrings.Buttons.Edit}
              sx={rowButtonProps(isAllDisabled || isEdDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--orange)')}
              size='small'
              disabled={isAllDisabled || isEdDisabled}
              onClick={(event) => {
                window.location.href = `${window.location.protocol}//${window.location.host}/sites/acRdDokumenty/_layouts/15/SPListForm.aspx?PageType=6&List=acLibRozpracovane&ID=${props.item.getValueByName('ID')}&Source=${Source}&ContentTypeId=${props.item.getValueByName('ContentTypeId')}&RootFolder=/sites/acRdDokumenty/acLibRozpracovane`
            }}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              title={LocaleStrings.Buttons.Reminders}
              sx={rowButtonProps(isAllDisabled || isPrDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--mint)')}
              size='small'
              disabled={isAllDisabled || isPrDisabled}
              onClick={(event) => {
                setDialog(DialogType.Pr)
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
                setDialog(DialogType.Sc)
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
                setDialog(DialogType.Pb)
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
                setDialog(DialogType.Rm)
              }}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </>
        }
        {
          docLib === DocLib.Platne &&
          <>
            <IconButton
              title={'Oboznamovanie'}
              sx={rowButtonProps(isObDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--cyan)')}
              size='small'
              onClick={(event) => {
                setDialog(DialogType.Ob)
              }}
            >
              Ob
            </IconButton>
            <IconButton
              title={'Revízia'}
              sx={rowButtonProps(isReDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--indigo)')}
              size='small'
              disabled={isReDisabled}
              onClick={(event) => {
                setDialog(DialogType.Re)
              }}
            >
              Re
            </IconButton>
            <IconButton 
              title={LocaleStrings.Buttons.Archivation}
              sx={rowButtonProps(isArDisabled ? 'rgba(0, 0, 0, 0.26)' : 'var(--purple)')}
              size='small' 
              disabled={isArDisabled}
              onClick={(event) => {
                setDialog(DialogType.Ar)
              }}
            >
              Ar
            </IconButton>
          </>
        }
      </Stack>
    </>
  )
}

export default RdDocButtons
