import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Grid } from '@mui/material'
import React from 'react'
import uniqid from 'uniqid'
import { trlb } from '@empty/lib.constants'
import { DefaultButton, DeleteIconButton, DownloadFileButton } from './Buttons'
import { SectionSubtitle, Space20 } from './Commons'
import { FlexDataTable } from './FlexCommons'

interface FileRow {
  id: string
  name: string
}

export const DocumentsListAndButtonV2 = ({
  background,
  edit,
  initialFiles,
  handleUploadDocument,
  canDeleteNotUploadedFiles = false,
  downloadEnabled,
}: {
  initialFiles?: {
    fileId: string
    name: string
  }[]
  background?: string
  edit: boolean
  rows: FileRow[]
  handleDownload: (id: string) => void
  handleUploadDocument: (files: File[]) => void
  setRows: (rows: FileRow[]) => void
  canDeleteNotUploadedFiles: boolean
  downloadEnabled: boolean
}) => {
  const [rows, setRows] = React.useState<FileRow[]>([])

  React.useEffect(() => {
    if ((initialFiles ?? [])?.length > 0)
      setRows(
        initialFiles!.map(item => ({
          id: item.fileId,
          name: item.name,
        })),
      )
  }, [initialFiles])

  const inputRef = React.useRef(null)
  // INSTALL: use your own downloadFile function
  const downloadFile = () => new Promise<Blob>(resolve => resolve(new Blob()))

  const handleDownload = async value => {
    const blob = await downloadFile(value.row.id)
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.setAttribute('download', value.row.name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  const handleUpload = (event: HTMLInputElement) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return

    const newFilesArray = Array.from(input.files)
    setRows([
      ...rows,
      ...newFilesArray.map(item => ({
        id: uniqid() + item.name,
        name: item.name,
        notUploaded: true,
      })),
    ])
    handleUploadDocument(newFilesArray)
  }

  const columns = [
    { field: 'name', headerName: trlb('file_name'), flex: 1 },
    {
      field: 'download',
      headerName: '',
      flex: 1,
      renderCell: value => {
        return (
          <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
            {!value?.row?.notUploaded && downloadEnabled && <DownloadFileButton onClick={_ => handleDownload(value)} />}
          </div>
        )
      },
    },
    canDeleteNotUploadedFiles && {
      field: 'deleteColumn',
      headerName: '',
      flex: 1,
      renderCell: value => {
        return (
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            {edit && <DeleteIconButton onClick={() => deleteRow(value.id)} />}
          </div>
        )
      },
    },
  ]

  const deleteRow = (rowID: string) => {
    let newRows = rows.filter(row => row.id !== rowID)
    setRows(newRows)
  }

  return (
    <Grid container>
      {edit ? (
        <>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={inputRef}
              onChange={handleUpload}
              accept='application/pdf'
              name='uploads'
            />
            <DefaultButton
              icon={<FileUploadIcon sx={{ marginRight: '10px' }} />}
              text={trlb('upload_documents')}
              onClick={() => inputRef.current?.click?.()}
            />
          </Grid>
          <Space20 />
        </>
      ) : null}
      <SectionSubtitle text={trlb('uploaded_documents')} />

      <FlexDataTable {...{ rows, columns }} background={background} height='30vh' />
    </Grid>
  )
}
