import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { IUpdateUserForm } from 'src/web/modules/services'
import { Button, CircularProgress } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2)
    },
    formFields: {
      marginTop: theme.spacing(2),
      width: '100%',
      textAlign: 'left'
    },
    formTextArea: {
      marginTop: theme.spacing(2),
      width: '100%',
      height: '200px',
      textAlign: 'left'
    },
    formLabel: {
      fontSize: '1em',
      textAlign: 'left'
    }
  })
)

interface Props {
  initialValue: IUpdateUserForm
  onSubmit: (values: IUpdateUserForm) => void
  onClose: () => void
}

export const UpdateUserForm = ({ onSubmit, onClose, initialValue }: Props) => {
  const classes = useStyles()

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValue}
      validate={(values: IUpdateUserForm) => {
        const errors: Partial<IUpdateUserForm> = {}
        const requiredMsg: string = '必須項目です。'

        if (!values.displayName) {
          errors.displayName = requiredMsg
        }

        if (!values.description) {
          errors.description = requiredMsg
        }
        return errors
      }}
      onSubmit={(values: IUpdateUserForm, { setSubmitting }) => {
        onSubmit(values)
        onClose()
        setSubmitting(false)
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field name="displayName" type="text" label="表示名" className={classes.formFields} component={TextField} />
          <Field name="position" type="text" label="肩書き" className={classes.formFields} component={TextField} />
          <Field name="description" type="text" label="自己紹介" className={classes.formFields} component={TextField} />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            className={classes.formFields}
            onClick={submitForm}
          >
            {!isSubmitting ? '編集' : <CircularProgress size={24} />}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
