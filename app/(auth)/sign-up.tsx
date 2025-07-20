import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { Link, useRouter } from "expo-router"
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

export default function SignUp() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const submit = async () => {
    if (!form.name || !form.email || !form.password) return Alert.alert("Error", "Please enter valid name, email address & password")
    setIsSubmitting(true)
    try {
      // call appwrite sign up function here
      Alert.alert("Success", "You have successfully signed up")
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
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Full Name"
      />
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
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="flex-row justify-center mt-5 gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link className="text-primary base-bold" href={'/sign-in'}>Sign In</Link>
      </View>
    </View>
  )
}