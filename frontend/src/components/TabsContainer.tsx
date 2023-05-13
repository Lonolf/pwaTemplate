import { Box, Tabs, Tab } from '@mui/material'
import React from 'react'

const TabsContainer = ({
  value,
  setValue,
  tabs,
}: {
  value: string
  setValue: (value: string) => void
  tabs: string[]
}) => {
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        {tabs.map(tab => (
          <Tab key={tab} value={tab} label={tab} sx={{ fontWeight: '600' }} />
        ))}
      </Tabs>
    </Box>
  )
}

export default TabsContainer
