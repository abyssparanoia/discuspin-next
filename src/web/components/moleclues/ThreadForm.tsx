import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { CreateThreadForm as ICreateThreadForm } from 'src/web/modules/services'
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
  onSubmit: (values: ICreateThreadForm) => void
  onClose: () => void
}

export const CreateThreadForm = ({ onSubmit, onClose }: Props) => {
  const classes = useStyles()
  let values: ICreateThreadForm = {
    title: '',
    description: ''
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={values}
      validate={(values: ICreateThreadForm) => {
        const errors: Partial<ICreateThreadForm> = {}
        const requiredMsg: string = '必須項目です。'

        if (!values.title) {
          errors.title = requiredMsg
        }

        if (!values.description) {
          errors.description = requiredMsg
        }
        return errors
      }}
      onSubmit={(values: ICreateThreadForm, { setSubmitting }) => {
        onSubmit(values)
        onClose()
        setSubmitting(false)
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field name="title" type="text" label="title" className={classes.formFields} component={TextField} />
          <Field
            name="description"
            type="text"
            label="Description"
            className={classes.formTextArea}
            component={TextField}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            className={classes.formFields}
            onClick={submitForm}
          >
            {!isSubmitting ? '作成' : <CircularProgress size={24} />}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
