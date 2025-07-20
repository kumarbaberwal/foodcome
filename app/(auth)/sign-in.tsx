import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { Link, useRouter } from "expo-router"
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

export default function SignIn() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const submit = async () => {
    if (!form.email || !form.password) return Alert.alert("Error", "Please enter valid email address & password")
    setIsSubmitting(true)
    try {
      // call appwrite sign in function here
      Alert.alert("Success", "You have successfully signed in")
      router.replace('/index')
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton
        title="Sign In"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="flex-row justify-center mt-5 gap-2">
        <Text className="base-regular text-gray-100">
          Don&apos;t have an account?
        </Text>
        <Link className="text-primary base-bold" href={'/sign-up'}>Sign Up</Link>
      </View>
    </View>
  )
}