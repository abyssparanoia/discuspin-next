import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { CreateChannelForm as ICreateChannelForm } from 'modules/services'
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
    formLabel: {
      fontSize: '1em',
      textAlign: 'left'
    }
  })
)

interface Props {
  onSubmit: (values: ICreateChannelForm) => void
}

export const CreateChannelForm = ({ onSubmit }: Props) => {
  const classes = useStyles()
  let values: ICreateChannelForm = {
    name: '',
    description: ''
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={values}
      validate={(values: ICreateChannelForm) => {
        const errors: Partial<ICreateChannelForm> = {}
        const requiredMsg: string = '必須項目です。'

        if (!values.name) {
          errors.name = requiredMsg
        }

        if (values.description) {
          errors.description = requiredMsg
        }
        return errors
      }}
      onSubmit={(values: ICreateChannelForm, { setSubmitting }) => {
        onSubmit(values)
        setSubmitting(false)
      }}
      render={({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            name="email"
            type="email"
            label="メールアドレス or ユーザーネーム"
            className={classes.formFields}
            component={TextField}
          />
          <Field
            name="password"
            type="password"
            label="パスワード"
            className={classes.formFields}
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
    />
  )
}
